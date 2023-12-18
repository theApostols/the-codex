import { gql } from "@apollo/client";

// export const GET_ALL_USERS = gql`
// allUsers {
//   username
//   snippets {
//     _id
//   }
//   comments {
//     _id
//   }
//   savedSnippets {
//     _id
//   }
// }
// `;

export const GET_ALL_SNIPPETS = gql`
  query Query {
    allSnippets {
      _id
      snippetCode {
        code
      }
    }
  }
`;
