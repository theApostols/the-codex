const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
   users: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    //Retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },


  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if(!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
  },

  // Add a third argument to the resolver to access data in our context

  addSkill: async (parent, { userId, skill }, context) => {
    // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
    if (context.user) {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { skills: skill },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    throw new AuthenticationError('You need to be logged in!');
  },

  // Set up mutation so a logged in user can only remove their profile and no one else's

  removeUser: async (parent, args, context) => {
    if (context.user) {
      return User.findOneAndDelete({ _id: context.user._id });
    }
    throw new AuthenticationError('You need to be logged in!');
  },
  },
};




// const resolvers = {
//   Query: {
//     hello: () => "Hello, world!",
//   },
// };

module.exports = resolvers;
