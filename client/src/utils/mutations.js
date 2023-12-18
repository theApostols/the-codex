import { gql } from "@apollo/client";

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
      username
      snippetTitle
      snippetText
      snippetCode {
        language
        code
      }
      resources {
        _id
        title
        link
      }
      tags
      formattedCreationDate
      formattedEditDate
    }
  }
`;
