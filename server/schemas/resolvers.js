// const {} = require("../models");
// const {} = require("../utils/auth");

// const resolvers = {
//   Query: {},
//   Mutation: {},
// };

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};

module.exports = resolvers;
