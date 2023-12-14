// const typeDefs = ``;

// const typeDefs = `
//   type Query {
//     hello: String
//   }
// `;

const typeDefs = `
type User
{
  _id: ID!
  username: String!
  email: String!
  password: String!
  snippets: [ID]
  savedSnippets: [ID]
  comments: [ID]
}

type CodeBlock
{
  _id: ID!
  language: String!
  code: String!
}

input CodeBlockInput
{
  language: String!
  code: String!
}

type Comment
{
  _id: ID!
  username: String!
  commentText: String
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
  oneSnippet(snippetId: ID!): Snippet
  userSnippets(username: String!): [Snippet]
}

type Mutation
{
  createUser(username: String!, email: String!, password: String!): User
  createSnippet(username: String!, snippetTitle: String, snippetText: String!, snippetCode: [CodeBlockInput]!): Snippet
  createComment(username: String!, commentText: String!, commentCode: [CodeBlockInput], snippetId: ID!): Comment
}
`;

module.exports = typeDefs;
