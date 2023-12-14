// const typeDefs = ``;

// const typeDefs = `
//   type Query {
//     hello: String
//   }
// `;

const typeDefs = `
type User {
  id: ID!
  username: String!
  email: String!
  snippets: [Snippet]
  # need to add more fields WIP
}

type Snippet {
  id: ID!
  username: String!
  snippetText: String!
  comments: [Comment]
  rating: [Ratings]
  # need to add more fields WIP
}

type Comment {
  id: ID!
  username: String!
  commentText: String!
  # need to add more fields WIP
}

type CodeBlock {
  id: ID!
  username: String!
  codeBlockText: String!
  # need to add more fields WIP
}

type Ratings {
  props: Int!
  drops: Int!
}


type Query {
  getUser(username: String!): User
  getSnippet(id: ID!): Snippet
  getComment(id: ID!): Comment
  getCodeBlock(id: ID!): CodeBlock
  # need to add more fields WIP
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): User
  createSnippet(username: String!, snippetText: String!): Snippet
  createComment(username: String!, commentText: String!): Comment
  createCodeBlock(username: String!, codeBlockText: String!): CodeBlock
  # need to add more fields WIP
}
`;







module.exports = typeDefs;
