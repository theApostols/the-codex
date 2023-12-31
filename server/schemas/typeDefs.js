//defining typeDefs
//==============================================================
const typeDefs = `
type User
{
  _id: ID!
  username: String!
  email: String!
  password: String!
  image: String
  snippets: [Snippet]
  savedSnippets: [Snippet]
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

input ResourceInput
{
  title: String!
  link: String!
}

type Comment
{
  _id: ID!
  parentSnippetId: Snippet
  username: String!
  commentText: String
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

type UserAndSnippets
{
  user: User
  snippets: [Snippet]
}

type Query
{
  allUsers: [User]
  oneUser(username: String!): User
  allSnippets(tags: [String]): [Snippet]
  userSnippets(username: String!, tags: [String]): UserAndSnippets
  mySnippets(username: String!): [Snippet]
  userSavedSnippets(username: String!): User
  userComments(username: String!): [Comment]
  oneSnippet(snippetId: ID!): Snippet
  oneComment(commentId: ID!): Comment
}

type Mutation
{
  loginUser(email: String!, password: String!): JWTAuth
  createUser(username: String!, email: String!, password: String!): JWTAuth
  editUser(currentUser: String!, username: String, password: String, image: String, currentPassword: String!): JWTAuth
  createSnippet(username: String!, snippetTitle: String!, snippetText: String!, snippetCode: [CodeBlockInput]!, resources: [ResourceInput], tags: [String]): Snippet
  editSnippet(snippetId: ID!, snippetTitle: String!, snippetText: String!, snippetCode: [CodeBlockInput]!, resources: [ResourceInput], tags: [String]): Snippet
  deleteSnippet(snippetId: ID!): Snippet
  createComment(parentSnippetId: ID!, username: String!, commentText: String!): Comment
  editComment(commentId: ID!, commentText: String!): Comment
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
