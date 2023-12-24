//importing models & multer
//==============================================================
const {User, Snippet, Comment} = require('../models');
const {signToken, AuthenticationError} = require("../utils/auth");
//==============================================================

//defining resolvers
//=============================================================
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
    oneUser: async (parent, {username}) =>
    {
      try 
      {
        //attempts to find & return one user by their username
        const user = await User.findOne({username})
        return user;
      } 
      catch (error) 
      {
        // Log the error and throw a new error
        console.error(error);
        throw new Error('Failed to retrieve user data; ' + error.message);
      }
    },
    //query to retrieve all snippets, filtering by provided tags
    allSnippets: async (parent, {tags}) =>
    {
      try
      {
        //create a tags filter if any tags were provided, otherwise use an empty filter
        const filter = tags ? {tags: {$all: tags}} : {};

        //retrieves & returns all snippets, filtering by tags if applicable & sorting by newest
        const snippets = await Snippet.find(filter).sort({creationDate: -1});
        return snippets;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to retrieve snippets; ' + error.message);
      }
    },
    //query to return all snippets created by a specific user
    userSnippets: async (parent, {username, tags}) =>
    {
      try
      {
        //create a tags filter if any tags were provided, otherwise use a filter to just search by username
        const filter = tags ? {tags: {$all: tags}, username: username} : {username};

        //finds all snippets created by a specific user, filtering by tags if applicable & sorting by newest
        const snippets = await Snippet.find(filter).sort({creationDate: -1});

        //retrieves user that created the above snippets
        const user = await User.findOne({username});

        //returns the user & snippets data
        return {user, snippets};
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error("Failed to retrieve the user's snippets; " + error.message);
      }
    },
    //query to return all snippets created by you
    mySnippets: async (parent, {username}) =>
    {
      try
      {
        //finds all snippets created by a specific user
        const snippets = await Snippet.find({username});
        return snippets;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error("Failed to retrieve the user's snippets; " + error.message);
      }
    },
    //query to return all snippets saved by a specific user
    userSavedSnippets: async (parent, {username}) =>
    {
      try
      {
        //finds a user by username & returns all the populated data of their saved snippets
        const user = await User.findOne({username}).populate('savedSnippets');
        return user;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error("Failed to retrieve the user's saved snippets; " + error.message);
      }
    },
    //query to return all comments created by a specific user
    userComments: async (parent, {username}) =>
    {
      try
      {
        //finds and returns all comments made by a specific user, plus their parent snippet
        const comments = await Comment.find({username}).populate('parentSnippetId');
        return comments;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error("Failed to retrieve the user's comments; " + error.message);
      }
    },
    //query to retrieve a specific snippet by ID
    oneSnippet: async (parent, {snippetId}) =>
    {
      try
      {
        //finds a specific snippet by objectId & return it, populating any comments attached to the snippet
        const snippet = await Snippet.findOne({_id: snippetId}).populate('comments');
        return snippet;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error("Failed to retrieve the snippet; " + error.message);
      }
    },
    //query to retrieve a specific comment by ID
    oneComment: async (parent, {commentId}) =>
    {
      try
      {
        //finds a specific comment by objectId & return it
        const comment = await Comment.findOne({_id: commentId});
        return comment;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error("Failed to retrieve the user's snippets; " + error.message);
      }
    }
  },
  Mutation:
  {
    //mutation to for a user to log in
    loginUser: async (parent, {email, password}) =>
    {
      try 
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
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to log in; ' + error.message);
      }
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
        throw new Error(error);
      }
    },
    //mutation to update a user's data
    editUser: async (parent, {currentUser, username, password, image, currentPassword}) =>
    {
      try 
      {
        console.log('about to find user');
        const userToUpdate = await User.findOne({username: currentUser});

        console.log('about to compare passwords');
        const passwordComparisonResult = await userToUpdate.comparePassword(currentPassword);

        console.log(passwordComparisonResult);

        //if the passwords do not match, throw an authentication error
        if (!passwordComparisonResult)
        {
          throw new AuthenticationError('Invalid details provided');
        }

        console.log('about to update user');
        const updatedUser = await User.findOneAndUpdate({username: currentUser},
        {
          username,
          password,
          image
        }, {new: true});

        console.log('about to save user');

        //marks the user's password as modified, & save again to cause the updated password to be hashed
        updatedUser.markModified('password');
        await updatedUser.save();

        if (currentUser !== username)
        {
          await Snippet.updateMany({username: currentUser},
          {
            $set: {username}
          });
          await Comment.updateMany({username: currentUser},
          {
            $set: {username}
          });
        }

        console.log(updatedUser);

        //sign a new JWT using the user's updated data
        const token = signToken(updatedUser);

        console.log('logging token;');
        console.log(token);

        //return the newly-signed JWT & the user that was logged in to
        return {token, updatedUser};
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to update user; ' + error.message);
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
        await User.findOneAndUpdate({username},
        {
          $addToSet: {snippets: newSnippet._id}
        });

        //returns the newly-created snippet
        return snippet;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to create new snippet; ' + error.message);
      }
    },
    //mutation to edit a snippet
    editSnippet: async (parent, {snippetId, snippetTitle, snippetText, snippetCode, resources, tags}) =>
    {
      try
      {
        //creates an edit date to attach to the editted snippet
        const editDate = Date.now();

        //attempts to find a snippet using the given objectId, and update its data using the rest of the arguments plus the new edit date
        const updatedSnippet = await Snippet.findOneAndUpdate({_id: snippetId},
        {
          snippetTitle,
          snippetText,
          snippetCode,
          resources,
          editDate,
          tags
        }, {new: true}); //returns the updated data

        //returns the updated snippet
        return updatedSnippet;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to edit snippet; ' + error.message);
      }
    },
    //mutation to delete a snippet
    deleteSnippet: async (parent, {snippetId}) =>
    {
      try
      {
        //attempts to find and delete a snippet using the given ID
        const deletedSnippet = await Snippet.findOneAndDelete({_id: snippetId});

        //remove the objectId of the deleted snippet from the appropriate user's 'snippets' array
        await User.findOneAndUpdate({username: deletedSnippet.username},
        {
          $pull: {snippets: snippetId} 
        });

        //returns the deleted snippet
        return deletedSnippet;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to delete snippet; ' + error.message);
      }
    },
    //mutation to create a new comment
    createComment: async (parent, {parentSnippetId, username, commentText}) =>
    {
      try
      {
        //attempts to create a new comment using the data provided by the arguments
        const newComment = await Comment.create({parentSnippetId, username, commentText});

        //finds & adds the objectId of the new comment to the appropriate user's and snippet's 'comments' array
        await User.findOneAndUpdate({username},
        {
          $addToSet: {comments: newComment._id},
        });
        await Snippet.findOneAndUpdate({_id: parentSnippetId},
        {
          $addToSet: {comments: newComment._id},
        });
    
        //return the newly-created comment
        return newComment;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to create new comment; ' + error.message);
      }
    },
    //mutation to edit a comment
    editComment: async (parent, {commentId, commentText}) =>
    {
      try
      {
        //creates an edit date to attach to the editted comment
        const editDate = Date.now();

        //attempts to find a comment under a specific snippet using the Ids provided by the arguments, and update its data using the rest of the arguments plus the edit date
        const updatedComment = await Comment.findOneAndUpdate({_id: commentId},
        {
          commentText,
          editDate
        }, {new: true}); //returns the updated data

        //returns the updated comment
        return updatedComment;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to edit comment; ' + error.message);
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
        throw new Error('Failed to delete comment; ' + error.message);
      }
    },
    //mutation to add props to a snippet
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
        throw new Error('Failed to add props; ' + error.message);
      }
    },
    //mutation to remove props from a snippet
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
        throw new Error('Failed to remove props; ' + error.message);
      }
    },
    //mutation to add drops to a snippet
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
        throw new Error('Failed to add drops; ' + error.message);
      }
    },
    //mutation to remove drops from a snippet
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
        throw new Error('Failed to remove drops; ' + error.message);
      }
    },
    //mutation to save a snippet to a user's personal list
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
        throw new Error('Failed to save snippet; ' + error.message);
      }
    },
    //mutation to remove a snippet from a user's personal list
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
        throw new Error('Failed to unsave snippet; ' + error.message);
      }
    }
  }
};
//==============================================================
        
//exporting resolver queries & mutation
//==============================================================
module.exports = resolvers;
//==============================================================
