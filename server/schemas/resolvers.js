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
    // user: async (parent, {username}) =>
    // {
    //   try
    //   {
    //     const user = await User.findOne({username});
    //     return user;
    //   }
    //   catch (error)
    //   {
    //     console.error(error);
    //     throw new Error('Failed to retrieve user;', error);
    //   }
    // },
  },

  // //Might need to add more Queries still a WIP but should be a good start

  //   Mutation:
  //   {
  //     createUser: async (_, { username, email, password }) =>
  //     {
  //       try 
  //       {
  //         const newUser = new User({ username, email, password });
  //         const result = await newUser.save();
  //         return result;
  //       }
  //       catch (error)
  //       {
  //         console.error(error);
  //         throw new Error('Failed to create user');
  //       }
  //     },
  //     createSnippet: async (_, { username, snippetText }) =>
  //     {
  //       try
  //       {
  //         const newSnippet = new Snippet({ username, snippetText });
  //         const result = await newSnippet.save();
  //         return result;
  //       }
  //       catch (error)
  //       {
  //         console.error(error);
  //         throw new Error('Failed to create snippet');
  //       }
  //     },
  //     createComment: async (_, { username, commentText, snippetId }) =>
  //     {
  //       try
  //       {
  //         const newComment = new Comment({ username, commentText });
  //         const result = await newComment.save();
  //       //store comments in array of comment IDs
  //       const updatedSnippet = await Snippet.findOneAndUpdate(
  //         snippetId,
  //         { $push: { comments: result._id } },
  //         { new: true }
  //       );
  //       return result;
  //       }
  //       catch (error)
  //       {
  //         throw new Error('Failed to create comment');
  //       }
  //     },
  //     createCodeBlock: async (_, { username, codeBlockText }) => {
  //       try {
  //         const newCodeBlock = new CodeBlock({ username, codeBlockText });
  //         const result = await newCodeBlock.save();
  //         return result;
  //       } catch (error) {
  //         console.error(error);
  //         throw new Error('Failed to create code block');
  //       }
  //     }
  //     // Need to add more mutations (WIP) this is gonna be LENGTHY hehe
  //   },
  //   User: {
  //     snippets: async (parent) => {
  //       try {
  //         const user = await User.findById(parent.id).populate('snippets');
  //         return user.snippets || [];
  //       } catch (error) {
  //         console.error(error);
  //         throw new Error('Failed to fetch user snippets');
  //       }
  //     },
  
  //     // Need to add more field resolvers for the User type (WIP)
  //   },
  //   Snippet: {
  //     comments: async (parent) => {
  //       try {
  //         const snippet = await Snippet.findById(parent.id).populate('comments');
  //         return snippet.comments || [];
  //       } catch (error) {
  //         console.error(error);
  //         throw new Error('Failed to fetch snippet comments');
  //       }
  //     },
  //     // Need to add more field resolvers for the Snippet type and a bunch of crap HAHA UGHH (WIP)
  //   },
};

module.exports = resolvers;