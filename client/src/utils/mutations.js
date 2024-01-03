import { gql } from "@apollo/client";

// export const ADD_USER = gql`
//   mutation addUser(
//     $firstName: String!
//     $lastName: String!
//     $email: String!
//     $password: String!
//   ) {
//     addUser(
//       firstName: $firstName
//       lastName: $lastName
//       email: $email
//       password: $password
//     ) {
//       token
//       user {
//         _id
//       }
//     }
//   }
// `;

//mutation to login a user
//used on the login page
//returns the signed JWT & user _id if successfully logged in
//arguments retrieved from input fields on the page
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

//mutation to create a user
//used on the signup page
//returns the signed JWT & user _id if successfully signed up
//arguments retrieved from input fields on the page
export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

//mutation to edit a user
//used on the user settings page
//returns the signed JWT & user _id if successfully updated
//currentUser argument retrieved from JWT
//other arguments retrieved from input fields on the page
export const EDIT_USER = gql`
  mutation editUser($currentUser: String!, $username: String, $password: String, $image: String, $currentPassword: String!)
  {
    editUser(currentUser: $currentUser, username: $username, password: $password, image: $image, currentPassword: $currentPassword)
    {
      token
      user
      {
        _id
      }
    }
  }
`;

//mutation to create a snippet
//used on the snippet creation page
//returns the _id of the newly-created snippet (use this to route to that snippet's page)
//username argument retrieved from JWT
//other arguments retrieved from input fields on the page
export const CREATE_SNIPPET = gql`
  mutation CreateSnippet(
    $username: String!
    $snippetTitle: String!
    $snippetText: String!
    $snippetCode: [CodeBlockInput]!
    $resources: [ResourceInput]
    $tags: [String]
  ) {
    createSnippet(
      username: $username
      snippetTitle: $snippetTitle
      snippetText: $snippetText
      snippetCode: $snippetCode
      resources: $resources
      tags: $tags
    ) {
      _id
    }
  }
`;

//mutation to edit a snippet
//used on snippet edit page (snippet creation page -> import snippet data using snippetId)
//returns the _id of the editted snippet
//snippetId argument retrieved from route parameters
//other arguments retrieved from input fields on the page
export const EDIT_SNIPPET = gql`
mutation EditSnippet(
  $snippetId: ID!,
  $snippetTitle: String!,
  $snippetText: String!,
  $snippetCode: [CodeBlockInput]!,
  $resources: [ResourceInput],
  $tags: [String]
) {
  editSnippet(
    snippetId: $snippetId,
    snippetTitle: $snippetTitle,
    snippetText: $snippetText,
    snippetCode: $snippetCode,
    resources: $resources,
    tags: $tags
  ) {
    _id
  }
}`;

//mutation to delete a snippet
//used on snippet edit page (snippet creation page -> import snippet data using snippetId)
//returns _id of the deleted snippet
//snippetId argument retrieved from route parameters
export const DELETE_SNIPPET = gql`
mutation DeleteSnippet($snippetId: ID!)
{
  deleteSnippet(snippetId: $snippetId)
  {
    _id
  }
}`;

//mutation to create a comment
//used on individual snippet page (for creating a comment with the comment box)
//returns _id of the newly-created comment
//parentSnippetId argument retrieved from route parameters (get it from the current URL)
//username argument retrieved from JWT
//commentText argument retrieved from comment box input field
export const CREATE_COMMENT = gql`
mutation CreateComment($parentSnippetId: ID!, $username: String!, $commentText: String!)
{
  createComment(parentSnippetId: $parentSnippetId, username: $username, commentText: $commentText)
  {
    _id
  }
}`;

//THIS MAY NOT BE USED IF IMPLEMENTATION IS TOO ANNOYING & COMPLICATED
//mutation to update a comment
//used on individual snippet page (after clicking edit button on a comment you've authored)
//returns _id of updated comment
//commentId argument retrieved from 'key' value of comment
//commentText argument retrieved from edit comment box input field
export const EDIT_COMMENT = gql`
mutation EditComment($commentId: ID!, $commentText: String!)
{
  editComment(commentId: $commentId, commentText: $commentText)
  {
    _id
  }
}`;

//mutation to delete a comment
//used on individual snippet page (after clicking delete button on a comment you've authored)
//returns _id of deleted comment
//commentId argument retrieved from 'key' value of comment
export const DELETE_COMMENT = gql`
mutation DeleteComment($commentId: ID!)
{
  deleteComment(commentId: $commentId)
  {
    _id
  }
}`;

//mutation to add props to a snippet
//used on individual snippet page or a page where you can see a snippet's preview
//returns _id of snippet
//username argument retrieved from JWT
//snippetId argument retrieved from;
  //individual snippet page - route parameters
  //pages where you see the snippet preview - snippet 'key' value
export const ADD_PROPS = gql`
mutation AddProps($username: String!, $snippetId: ID!)
{
  addProps(username: $username, snippetId: $snippetId)
  {
    _id
    props
    overallProps
  }
}`;

//mutation to remove props from a snippet
//used on individual snippet page or a page where you can see a snippet's preview
//returns _id of snippet
//username argument retrieved from JWT
//snippetId argument retrieved from;
  //individual snippet page - route parameters
  //pages where you see the snippet preview - snippet 'key' value
export const REMOVE_PROPS = gql`
mutation RemoveProps($username: String!, $snippetId: ID!)
{
  removeProps(username: $username, snippetId: $snippetId)
  {
    _id
    props
    overallProps
  }
}`;

//mutation to add drops to a snippet
//used on individual snippet page or a page where you can see a snippet's preview
//returns _id of snippet
//username argument retrieved from JWT
//snippetId argument retrieved from;
  //individual snippet page - route parameters
  //pages where you see the snippet preview - snippet 'key' value
export const ADD_DROPS = gql`
mutation AddDrops($username: String!, $snippetId: ID!)
{
  addDrops(username: $username, snippetId: $snippetId)
  {
    _id
    drops
    overallProps
  }
}`;

//mutation to remove drops from a snippet
//used on individual snippet page or a page where you can see a snippet's preview
//returns _id of snippet
//username argument retrieved from JWT
//snippetId argument retrieved from;
  //individual snippet page - route parameters
  //pages where you see the snippet preview - snippet 'key' value
export const REMOVE_DROPS = gql`
mutation RemoveDrops($username: String!, $snippetId: ID!)
{
  removeDrops(username: $username, snippetId: $snippetId)
  {
    _id
    drops
    overallProps
  }
}`;

//mutation to save a snippet to your personal list
//used on individual snippet page
//returns _id of saved snippet
//username argument retrived from JWT
//snippetId argument retrieved from route parameters
export const SAVE_SNIPPET = gql`
mutation SaveSnippet($username: String!, $snippetId: ID!)
{
  saveSnippet(username: $username, snippetId: $snippetId)
  {
    _id
  }
}`;

//mutation to unsave a snippet from your personal list
//used on individual snippet page
//returns _id of saved snippet
//username argument retrived from JWT
//snippetId argument retrieved from route parameters
export const UNSAVE_SNIPPET = gql`
mutation SaveSnippet($username: String!, $snippetId: ID!)
{
  unsaveSnippet(username: $username, snippetId: $snippetId)
  {
    _id
  }
}`;