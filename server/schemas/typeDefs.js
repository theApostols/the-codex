// const typeDefs = ``;

const typeDefs = `
type User
{
  _id: ID!
  username: String!
  email: String!
  password: String!
  snippets: [Snippet]
  savedSnippets: [ID]
  comments: [Comment]
}

type JWTAuth
{
  token: ID
  user: User
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

type Resource
{
  _id: ID!
  title: String!
  link: String!
}

type Comment
{
  _id: ID!
  username: String!
  commentText: String
  commentCode: [CodeBlock]
  resources: [Resource]
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
  resources: [Resource]
  tags: [String]
  props: [ID]
  drops: [ID]
  overallProps: Int
  formattedCreationDate: String!
  formattedEditDate: String
}

type Query
{
  allUsers: [User]
  allSnippets(tags: [String]): [Snippet]
  userSnippets(username: String!, tags: [String]): [Snippet]
  oneSnippet(snippetId: ID!): Snippet
  oneComment(commentId: ID!): Comment
}

type Mutation
{
  loginUser(email: String!, password: String!): JWTAuth
  createUser(username: String!, email: String!, password: String!): JWTAuth
  createSnippet(username: String!, snippetTitle: String, snippetText: String!, snippetCode: [CodeBlockInput]!): Snippet
  createComment(username: String!, commentText: String!, commentCode: [CodeBlockInput], snippetId: ID!): Comment
}
`;

module.exports = typeDefs;
//==============================================================
