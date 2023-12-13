// const typeDefs = ``;

// const typeDefs = `
//   type Query {
//     hello: String
//   }
// `;


const typeDefs = `
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String! 
    skills: [String] 
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addSkill(userId: ID!, skill: String!): User
    removeUser: User
  }
`;



module.exports = typeDefs;
