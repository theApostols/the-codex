//importing models
//==============================================================
const {User, Snippet} = require('../models');
//const {signToken, AuthenticationError} = require("../utils/auth");
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
    //mutation to create a new user
    createUser: async (parent, {username, email, password}) =>
    {
      try 
      {
        //attempts to create a new user using the username, email, & password arguments, save it to the database, & return it
        const newUser = new User({username, email, password});
        const result = await newUser.save();
        return result;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to create a new user;', error);
      }
    },
    //mutation to create a new snippet
    createSnippet: async (parent, {username, snippetTitle, snippetText, snippetCode}) =>
    {
      try
      {
        //attempts to create a new snippet using the username, snippetTitle, snippetText, & snippetCode arguments, and save it to the database
        const newSnippet = new Snippet({username, snippetTitle, snippetText, snippetCode});
        const result = await newSnippet.save();

        //adds the new snippet's objectId to the appropriate user's 'snippets' array
        await User.findOneAndUpdate({username}, {$addToSet: {snippets: newSnippet._id}})

        //returns the newly-created snippet
        return result;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to create new snippet;', error);
      }
    },
    //mutation to create a new comment
    createComment: async (parent, {username, commentText, commentCode, snippetId}) =>
    {
      try
      {
        //creates a new comment object using the username, commentText, & commentCode arguments
        const newComment =
        {
          username,
          commentText,
          commentCode
        };

        //attempts to find a snippet by the objectId given in the arguments, and add the newComment object to its 'comments' array
        const updatedSnippet = await Snippet.findOneAndUpdate({_id: snippetId},
          {$push: {comments: newComment}}, {new: true});

        //retrieves the newly-created comment by grabbing the last comment in the updated snippet's 'comments' array
        const result = updatedSnippet.comments[updatedSnippet.comments.length - 1];

        //adds the new comment's objectId to the appropriate user's 'comments' array
        await User.findOneAndUpdate({username}, {$addToSet: {comments: result._id}})
    
        //return the newly-created comment
        return result;
      }
      catch (error) //catches any errors that occur, log it to console, & throw it as a new error
      {
        console.error(error);
        throw new Error('Failed to create new comment;', error);
      }
    },
  }
};
//==============================================================
        
//exporting resolver queries & mutation
//==============================================================
module.exports = resolvers;
//==============================================================