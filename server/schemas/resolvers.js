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
    //query to retrieve all snippets
    allSnippets: async () =>
    {
      try
      {
        //retrieves & returns all snippets
        const snippets = await Snippet.find({});
        return snippets;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to retrieve snippets;', error);
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
    //NOTE; UPDATE THIS TO RETRIEVE USERNAME FROM CONTEXT
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
    createComment: async (parent, {username, commentText, commentCode, snippetId, resources}) =>
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
    //mutation to add props to a snippet
    //NOTE; UPDATE THIS TO RETRIEVE USERNAME FROM CONTEXT
    addProps: async (parent, {username, snippetId}) =>
    {
      try
      {
        //attempts to find a snippet by the objectId given in the arguments, and add the name of the user giving props to the 'props' array
        const updatedSnippet = await Snippet.findOneAndUpdate({_id: snippetId},
          {$addToSet: {props: username}}, {new: true});
    
        //return the updated snippet
        return updatedSnippet;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to add props;', error);
      }
    },
    removeProps: async (parent, {username, snippetId}) =>
    {
      try
      {
        //attempts to find a snippet by the objectId given in the arguments, and remove the name of the user removing props from the 'props' array
        const updatedSnippet = await Snippet.findOneAndUpdate({_id: snippetId},
          {$pull: {props: username}}, {new: true});
    
        //return the updated snippet
        return updatedSnippet;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to add props;', error);
      }
    },
  }
};
//==============================================================
        
//exporting resolver queries & mutation
//==============================================================
module.exports = resolvers;
//==============================================================