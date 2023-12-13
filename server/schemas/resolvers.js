// const {} = require("../models");
// const {} = require("../utils/auth");

// const resolvers = {
//   Query: {},
//   Mutation: {},
// };

// const resolvers = {
//   Query: {
//     hello: () => "Hello, world!",
//   },
// };

const { User, Snippet, Comment, CodeBlock } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");


//testing resolvers for User, Snippet, Comment, and CodeBlock still a WIP playing around with it

const resolvers = {
  Query: {
    //user query (still unsure if this is correct)
    getUser: async (_, { username }) => {
      try {
        const user = await User.findOne({ username });
        return user;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user');
      }
    },
    //snippet query
    getSnippet: async (_, { id }) => {
      try {
        const snippet = await Snippet.findById(id);
        return snippet;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch snippet');
      }
    },
    //comment query
    getComment: async (_, { id }) => {
      try {
        const comment = await Comment.findById(id);
        return comment;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch comment');
      }
    },
    //codeblock query
    getCodeBlock: async (_, { id }) => {
      try{
        const codeBlock = await codeBlock.findById(id);
        return codeBlock;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch code block');
      }
  },
  },

//Might need to add more Queries still a WIP but should be a good start

  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const newUser = new User({ username, email, password });
        const result = await newUser.save();
        return result;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create user');
      }
    },
    createSnippet: async (_, { username, snippetText }) => {
      try {
        const newSnippet = new Snippet({ username, snippetText });
        const result = await newSnippet.save();
        return result;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create snippet');
      }
    },
    createComment: async (_, { username, commentText }) => {
      try {
        const newComment = new Comment({ username, commentText });
        const result = await newComment.save();
        return result;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create comment');
      }
    },
    createCodeBlock: async (_, { username, codeBlockText }) => {
      try {
        const newCodeBlock = new CodeBlock({ username, codeBlockText });
        const result = await newCodeBlock.save();
        return result;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create code block');
      }
    }
    // Need to add more mutations (WIP) this is gonna be LENGTHY hehe
  },
  User: {
    snippets: async (parent) => {
      try {
        const user = await User.findById(parent.id).populate('snippets');
        return user.snippets || [];
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user snippets');
      }
    },
    // Need to add more field resolvers for the User type (WIP)
  },
  Snippet: {
    comments: async (parent) => {
      try {
        const snippet = await Snippet.findById(parent.id).populate('comments');
        return snippet.comments || [];
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch snippet comments');
      }
    },
    // Need to add more field resolvers for the Snippet type and a bunch of crap HAHA UGHH (WIP)
  },
};

module.exports = resolvers;

