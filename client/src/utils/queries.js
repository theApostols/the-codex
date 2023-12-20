import { gql } from "@apollo/client";

//OLD QUERY GET_ALL_USERS
// export const GET_ALL_USERS = gql`
//   query AllUsers {
//     allUsers {
//       _id
//       username
//       snippets {
//         snippetTitle
//         snippetText
//         snippetCode {
//           code
//           language
//         }
//         formattedCreationDate
//         formattedEditDate
//         comments {
//           commentText
//           username
//           _id
//           commentCode {
//             code
//           }
//           formattedCreationDate
//           formattedEditDate
//         }
//         overallProps
//       }
//     }
//   }
// `;

//GET_ALL_USERS QUERY WITHOUT COMMENT CODE AND RESOURCES
export const GET_ALL_USERS = gql`
  query AllUsers {
    allUsers {
      _id
      username
      snippets {
        snippetTitle
        snippetText
        snippetCode {
          code
          language
        }
        formattedCreationDate
        formattedEditDate
        comments {
          commentText
          username
          _id
          formattedCreationDate
          formattedEditDate
        }
        overallProps
      }
    }
  }
`;

export const GET_USER_SNIPPETS = gql`
  query UserSnippets($username: String!, $tags: [String]) {
    userSnippets(username: $username, tags: $tags) {
      _id
      username
      snippetTitle
      snippetText
      snippetCode {
        code
        language
      }
      tags
      overallProps
      formattedCreationDate
      formattedEditDate
    }
  }
`;

export const GET_ALL_SNIPPETS = gql`
  query Query {
    allSnippets {
      _id
      snippetText
      snippetCode {
        code
        language
      }
      formattedCreationDate
      formattedEditDate
      props
      drops
    }
  }
`;

//OLD QUERY GET_INDIVIDUAL_SNIPPET
// export const GET_INDIVIDUAL_SNIPPET = gql`
//   query OneSnippet($snippetId: ID!) {
//     oneSnippet(snippetId: $snippetId) {
//       snippetText
//       snippetCode {
//         code
//         language
//       }
//       comments {
//         _id
//         parentSnippetId
//         username
//         commentText
//         commentCode {
//           code
//           _id
//           language
//         }
//         resources {
//           link
//           title
//           _id
//         }
//         creationDate
//         editDate
//         formattedCreationDate
//         formattedEditDate
//       }
//     }
//   }
// `;

//GET_INDIVIDUAL_SNIPPET QUERY WITHOUT COMMENT CODE AND RESOURCES
export const GET_INDIVIDUAL_SNIPPET = gql`
  query OneSnippet($snippetId: ID!) {
    oneSnippet(snippetId: $snippetId) {
      snippetText
      snippetCode {
        code
        language
      }
      comments {
        _id
        parentSnippetId
        username
        commentText
        creationDate
        editDate
        formattedCreationDate
        formattedEditDate
      }
    }
  }
`;
