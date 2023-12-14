const {User, Snippet} = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");


//testing resolvers for User, Snippet, Comment, and CodeBlock still a WIP playing around with it

const resolvers =
{
  Query:
  {
    allSnippets: async () =>
    {
      try
      {
        const snippets = await Snippet.find({});
        return snippets;
      }
      catch (error)
      {
        console.error(error);
        throw new Error('Failed to retrieve snippets;', error);
      }
    },
    oneSnippet: async (parent, {snippetId}) =>
    {
      try
      {
        const snippet = await Snippet.find({_id: snippetId});
        return snippet;
      }
      catch (error)
      {
        console.error(error);
        throw new Error("Failed to retrieve the user's snippets;", error);
      }
    },
    userSnippets: async (parent, {username}) =>
    {
      try
      {
        const snippets = await Snippet.find({username});
        return snippets;
      }
      catch (error)
      {
        console.error(error);
        throw new Error("Failed to retrieve the user's snippets;", error);
      }
    },
  },
  Mutation:
  {
    createUser: async (parent, {username, email, password}) =>
    {
      try 
      {
        const newUser = new User({username, email, password});
        const result = await newUser.save();
        return result;
      }
      catch (error)
      {
        console.error(error);
        throw new Error('Failed to create a new user;', error);
      }
    },
    createSnippet: async (parent, {username, snippetTitle, snippetText, snippetCode}) =>
    {
      try
      {
        const newSnippet = new Snippet({username, snippetTitle, snippetText, snippetCode});
        const result = await newSnippet.save();

        await User.findOneAndUpdate({username}, {$addToSet: {snippets: newSnippet._id}})

        return result;
      }
      catch (error)
      {
        console.error(error);
        throw new Error('Failed to create new snippet;', error);
      }
    },
  }
};

        

module.exports = resolvers;