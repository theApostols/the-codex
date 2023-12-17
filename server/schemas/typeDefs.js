//defining typeDefs
//==============================================================
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

input ResourceInput
{
  title: String!
  link: String!
}

type Comment
{
  _id: ID!
  parentSnippetId: ID
  username: String!
  commentText: String
  commentCode: [CodeBlock]
  resources: [Resource]
  creationDate: String!
  editDate: String
  formattedCreationDate: String!
  formattedEditDate: String
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
  props: [String]
  drops: [String]
  overallProps: Int
  formattedCreationDate: String!
  formattedEditDate: String
}

type Query
{
  allSnippets: [Snippet]
  oneSnippet(snippetId: ID!): Snippet
  userSnippets(username: String!): [Snippet]
  oneComment(commentId: ID!): Comment
}

type Mutation
{
  loginUser(email: String!, password: String!): JWTAuth
  createUser(username: String!, email: String!, password: String!): JWTAuth
  createSnippet(username: String!, snippetTitle: String!, snippetText: String!, snippetCode: [CodeBlockInput]!, resources: [ResourceInput], tags: [String]): Snippet
  editSnippet(snippetId: ID!, snippetTitle: String!, snippetText: String!, snippetCode: [CodeBlockInput]!, resources: [ResourceInput], tags: [String]): Snippet
  deleteSnippet(snippetId: ID!): Snippet
  createComment(parentSnippetId: ID!, username: String!, commentText: String!, commentCode: [CodeBlockInput], resources: [ResourceInput]): Comment
  editComment(commentId: ID!, commentText: String!, commentCode: [CodeBlockInput], resources: [ResourceInput]): Comment
  deleteComment(commentId: ID!): Comment
  addProps(username: String!, snippetId: ID!): Snippet
  removeProps(username: String!, snippetId: ID!): Snippet
  addDrops(username: String!, snippetId: ID!): Snippet
  removeDrops(username: String!, snippetId: ID!): Snippet
  saveSnippet(username: String!, snippetId: ID!): User
  unsaveSnippet(username: String!, snippetId: ID!): User
}
`;
//==============================================================

//exporting typeDefs
//==============================================================
module.exports = typeDefs;
//==============================================================