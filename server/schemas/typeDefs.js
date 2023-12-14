// const typeDefs = ``;

// const typeDefs = `
//   type Query {
//     hello: String
//   }
// `;

const typeDefs = `
type CodeBlock
{
  _id: ID!
  language: String!
  code: String!
}

type Comment
{
  _id: ID!
  username: String!
  commentText: String!
  commentCode: [CodeBlock]
  creationDate: String!
  formattedCreationDate: String!
}

type Snippet
{
  _id: ID!
  username: String!
  snippetTitle: String!
  snippetText: String!
  snippetCode: [CodeBlock]!
  creationDate: String!
  editDate: String
  comments: [Comment]
  props: [ID]
  drops: [ID]
  overallProps: Int
  formattedCreationDate: String!
  formattedEditDate: String
}

type Query
{
  allSnippets: [Snippet]
  oneSnippet(snippetId: ID!): [Snippet]
  userSnippets(username: String!): [Snippet]
}
`;

/*
type User
{
  id: ID!
  username: String!
  email: String!
  snippets: [Snippet]!
}

  getSnippet(id: ID!): Snippet
  getComment(id: ID!): Comment
  getCodeBlock(id: ID!): CodeBlock
  # need to add more fields WIP
}
 */

/*type Mutation {
  createUser(username: String!, email: String!, password: String!): User
  createSnippet(username: String!, snippetText: String!): Snippet
  createComment(username: String!, commentText: String!): Comment
  createCodeBlock(username: String!, codeBlockText: String!): CodeBlock
  # need to add more fields WIP
} */



module.exports = typeDefs;
