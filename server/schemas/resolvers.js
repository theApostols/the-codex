//importing models
//==============================================================
const {User, Snippet} = require('../models');
const {signToken, AuthenticationError} = require("../utils/auth");
//==============================================================

//defining resolvers
//==============================================================
const resolvers =
{
  Query:
  {
    //query to retrieve all users
    allUsers: async () => {
      try 
      {
       // Retrieve and return all users, populating their snippets along with comments
      const users = await User.find({}).populate({
        path: 'snippets',
        populate: { path: 'comments' }
      });
        return users;
      } 
      catch (error) 
      {
        // Log the error and throw a new error
        console.error(error);
        throw new Error('Failed to retrieve users: ' + error.message);
      }
    },
    //query to retrieve all snippets, filtering by provided tags
    allSnippets: async (parent, {tags}) =>
    {
      try
      {
        //create a tags filter if any tags were provided, otherwise use an empty filter
        const filter = tags ? {tags: {$all: tags}} : {};

        //retrieves & returns all snippets, filtering by tags if applicable
        const snippets = await Snippet.find(filter);
        return snippets;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to retrieve snippets;', error);
      }
    },
    //query to return all snippets created by a specific user
    userSnippets: async (parent, {username, tags}) =>
    {
      try
      {
        //create a tags filter if any tags were provided, otherwise use a filter to just search by username
        const filter = tags ? {tags: {$all: tags}, username: username} : {username};

        //finds and returns all snippets created by a specific user, filter by tags if applicable
        const snippets = await Snippet.find(filter);
        return snippets;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error("Failed to retrieve the user's snippets;", error);
      }
    },
    //query to retrieve a specific snippet by ID
    oneSnippet: async (parent, {snippetId}) =>
    {
      try
      {
        //finds a specific snippet by objectId & return it
        const snippet = await Snippet.findOne({_id: snippetId});
        return snippet;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error("Failed to retrieve the user's snippets;", error);
      }
    },
    //query to return all snippets created by a specific user
    //NOTE; UPDATE THIS TO RETRIEVE USERNAME FROM CONTEXT
    userSnippets: async (parent, {username}) =>
    {
      try
      {
        //finds and returns all snippets created by a specific user
        const snippets = await Snippet.find({username});
        return snippets;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error("Failed to retrieve the user's snippets;", error);
      }
    },
  },
  Mutation:
  {
    //mutation to for a user to log in
    loginUser: async (parent, {email, password}) =>
    {
      //attempts to find a user with the email provided by the arguments
      const user = await User.findOne({email});

      //if such a user could not be found, throw an authentication error
      if (!user)
      {
        throw new AuthenticationError('Unable to log in using the provided details. Please try again.');
      }

      //compare the password provided by the argument to the user's password via bcrypt
      const passwordComparisonResult = await user.comparePassword(password);

      //if the passwords do not match, throw an authentication error
      if (!passwordComparisonResult)
      {
        throw new AuthenticationError('Unable to log in using the provided details. Please try again.');
      }

      //sign a new JWT using the user's data
      const token = signToken(user);

      //return the newly-signed JWT & the user that was logged in to
      return {token, user};
    },
    //mutation to create a new user
    createUser: async (parent, {username, email, password}) =>
    {
      try 
      {
        //attempts to create a new user using the username, email, & password arguments, save it to the database, & return it
        const newUser = new User({username, email, password});
        const user = await newUser.save();

        //signs a new JWT using the newly-created user's data
        const token = signToken(user);

        //return the newly-signed JWT & user data
        return {token, user};
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to create a new user;', error);
      }
    },
    //mutation to create a new snippet
    createSnippet: async (parent, {username, snippetTitle, snippetText, snippetCode, resources, tags}) =>
    {
      try
      {
        //attempts to create a new snippet using the username, snippetTitle, snippetText, snippetCode, resources, & tags arguments, and save it to the database
        const newSnippet = new Snippet({username, snippetTitle, snippetText, snippetCode, resources, tags});
        const snippet = await newSnippet.save();

        //adds the new snippet's objectId to the appropriate user's 'snippets' array
        await User.findOneAndUpdate({username}, {$addToSet: {snippets: newSnippet._id}})

        //returns the newly-created snippet
        return snippet;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to create new snippet;', error);
      }
    },
    //mutation to create a new comment
    //NOTE; UPDATE THIS TO RETRIEVE USERNAME FROM CONTEXT
    createComment: async (parent, {parentSnippetId, username, commentText, commentCode, resources}) =>
    {
      try
      {
        //creates a new comment object using the username, commentText, commentCode, & resources arguments
        const newComment =
        {
          username,
          commentText,
          commentCode,
          resources
        };

        //attempts to find a snippet by the objectId given in the arguments, and add the newComment object to its 'comments' array
        const updatedSnippet = await Snippet.findOneAndUpdate({_id: snippetId},
          {$push: {comments: newComment}}, {new: true});

        //retrieves the newly-created comment by grabbing the last comment in the updated snippet's 'comments' array
        const comment = updatedSnippet.comments[updatedSnippet.comments.length - 1];

        //adds the new comment's objectId to the appropriate user's 'comments' array
        await User.findOneAndUpdate({username}, {$addToSet: {comments: comment._id}})
    
        //return the newly-created comment
        return comment;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to create new comment;', error);
      }
    },
    //mutation to edit a comment
    editComment: async (parent, {commentId, commentText, commentCode, resources}) =>
    {
      try
      {
        //creates an edit date to attach to the editted comment
        const editDate = Date.now();

        //attempts to find a comment under a specific snippet using the Ids provided by the arguments, and update its data using the rest of the arguments plus the edit date
        const updatedComment = await Comment.findOneAndUpdate({_id: commentId},
        {
          commentText,
          commentCode,
          resources,
          editDate
        }, {new: true}); //returns the updated data

        //returns the updated comment
        return updatedComment;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to edit comment;', error);
      }
    },
    //mutation to delete a comment
    deleteComment: async (parent, {commentId}) =>
    {
      try
      {
        //attempts to find and delete a comment using the given ID in the arguments
        const deletedComment = await Comment.findOneAndDelete({_id: commentId});

        //remove the objectId of the deleted comment from the appropriate user's & snippet's 'comments' array
        await User.findOneAndUpdate({username: deletedComment.username},
        {
          $pull: {comments: commentId} 
        });
        await Snippet.findOneAndUpdate({_id: deletedComment.parentSnippetId},
        {
          $pull: {comments: commentId} 
        });

        //returns the deleted comment
        return deletedComment;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to delete comment;', error);
      }
    },
    //mutation to add props to a snippet
    //NOTE; UPDATE THIS TO RETRIEVE USERNAME FROM CONTEXT
    addProps: async (parent, {username, snippetId}) =>
    {
      try
      {
        //attempts to find a snippet by the objectId given in the arguments
        const updatedSnippet = await Snippet.findOneAndUpdate({_id: snippetId},
        {
          $addToSet: {props: username}, //add the given username to the 'props' array if it isn't already there
          $pull: {drops: username} //remove the given username from the 'drops' array it if is there
        }, {new: true}); //returns the updated data
    
        //return the updated snippet
        return updatedSnippet;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to add props;', error);
      }
    },
    //mutation to remove props from a snippet
    //NOTE; UPDATE THIS TO RETRIEVE USERNAME FROM CONTEXT
    removeProps: async (parent, {username, snippetId}) =>
    {
      try
      {
        //attempts to find a snippet by the objectId given in the arguments
        const updatedSnippet = await Snippet.findOneAndUpdate({_id: snippetId},
        {
          $pull: {props: username} //remove the name of the user removing props from the 'props' array if it is there
        }, {new: true}); //returns the updated data
    
        //return the updated snippet
        return updatedSnippet;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to remove props;', error);
      }
    },
    //mutation to add drops to a snippet
    //NOTE; UPDATE THIS TO RETRIEVE USERNAME FROM CONTEXT
    addDrops: async (parent, {username, snippetId}) =>
    {
      try
      {
        //attempts to find a snippet by the objectId given in the arguments
        const updatedSnippet = await Snippet.findOneAndUpdate({_id: snippetId},
        {
          $addToSet: {drops: username}, //add the given username to the 'drops' array if it isn't already there
          $pull: {props: username} //remove the given username from the 'props' array it if is there
        }, {new: true}); //returns the updated data
    
        //return the updated snippet
        return updatedSnippet;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to add drops;', error);
      }
    },
    //mutation to remove drops from a snippet
    //NOTE; UPDATE THIS TO RETRIEVE USERNAME FROM CONTEXT
    removeDrops: async (parent, {username, snippetId}) =>
    {
      try
      {
        //attempts to find a snippet by the objectId given in the arguments
        const updatedSnippet = await Snippet.findOneAndUpdate({_id: snippetId},
        {
          $pull: {drops: username} //remove the name of the user removing drops from the 'drops' array if it is there
        }, {new: true}); //returns the updated data
    
        //return the updated snippet
        return updatedSnippet;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to remove drops;', error);
      }
    },
    //mutation to save a snippet to a user's personal list
    //NOTE; UPDATE THIS TO RETRIEVE USERNAME FROM CONTEXT
    saveSnippet: async (parent, {username, snippetId}) =>
    {
      try
      {
        //attempts to find a a user by username as per the given argument
        const updatedUser = await User.findOneAndUpdate({username},
        {
          $addToSet: {savedSnippets: snippetId} //add the snippetId provided by the arguments to the 'savedSnippets' array if it isn't already there
        }, {new: true}); //returns the updated data
    
        //return the updated snippet
        return updatedUser;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to save snippet;', error);
      }
    },
    //mutation to remove a snippet from a user's personal list
    //NOTE; UPDATE THIS TO RETRIEVE USERNAME FROM CONTEXT
    unsaveSnippet: async (parent, {username, snippetId}) =>
    {
      try
      {
        //attempts to find a a user by username as per the given argument
        const updatedUser = await User.findOneAndUpdate({username},
        {
          $pull: {savedSnippets: snippetId} //remove the snippetId provided by the arguments from the user's 'savedSnippets' array
        }, {new: true}); //returns the updated data
    
        //return the updated snippet
        return updatedUser;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to unsave snippet;', error);
      }
    }
  }
};
//==============================================================
        
//exporting resolver queries & mutation
//==============================================================
module.exports = resolvers;
