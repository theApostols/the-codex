import { gql } from "@apollo/client";

// OLD QUERIES
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
// export const GET_USER_SNIPPETS = gql`
//   query UserSnippets($username: String!, $tags: [String]) {
//     userSnippets(username: $username, tags: $tags) {
//       _id
//       username
//       snippetTitle
//       snippetText
//       snippetCode {
//         code
//         language
//       }
//       tags
//       overallProps
//       formattedCreationDate
//       formattedEditDate
//     }
//   }
// `;
// export const GET_ALL_SNIPPETS = gql`
//   query Query {
//     allSnippets {
//       _id
//       snippetText
//       snippetCode {
//         code
//         language
//       }
//       formattedCreationDate
//       formattedEditDate
//       props
//       drops
//     }
//   }
// `;
// export const GET_INDIVIDUAL_SNIPPET = gql`
//   query Query($snippetId: ID!) {
//     oneSnippet(snippetId: $snippetId) {
//       snippetText
//       snippetTitle
//       snippetCode {
//         code
//         language
//       }
//       creationDate
//       editDate
//       formattedCreationDate
//       formattedEditDate
//       props
//       drops
//       overallProps
//       tags
//       comments {
//         username
//         commentText
//         formattedCreationDate
//         formattedEditDate
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

//query to one user's data by username
//used on the user settings page
//retrieves the 'image' value of a specific user to render to the profile image preview as part of the 'src' attribute
//username argument is retrieved from JWT
export const GET_ONE_USER = gql`
query oneUser($username: String!) {
  oneUser(username: $username) {
    image
  }
}`;

//query to retrieve all snippet data
//used on the main snippets page
//retrieves all snippet data necessary to render each snippet preview
export const GET_ALL_SNIPPETS = gql`
query AllSnippets {
  allSnippets {
    _id
    username
    snippetTitle
    snippetText
    overallProps
    formattedCreationDate
    formattedEditDate
  }
}`;

//query to retrieve a specific user's snippets by username, filtering by tags, plus their username & image
//used on the user snippets page
//retrieves all snippet data necessary to render each snippet preview
//username argument is retrieved from route parameter
//tags argument is provided by checkboxes on the page (provide 'null' if no checkboxes are ticked)
// export const GET_USER_SNIPPETS = gql`
// query UserSnippets($username: String!, $tags: [String]) {
//   userSnippets(username: $username, tags: $tags) {
//     user {
//       username
//       image
//     }
//     snippets {
//       _id
//       username
//       snippetTitle
//       snippetText
//       overallProps
//       formattedCreationDate
//       formattedEditDate
//     }
//   }
// }`;

//TEST GET_USER_SNIPPETS
export const GET_USER_SNIPPETS = gql`
query UserSnippets($username: String!, $tags: [String]) {
  userSnippets(username: $username, tags: $tags) {
    user {
      username
      image
    }
    snippets {
      _id
      username
      snippetTitle
      snippetText
      overallProps
      formattedCreationDate
      formattedEditDate
      resources {
        title
        link
      }
    }
  }
}`;

//query to retrieve your snippets by your username
//used on the 'my snippets' page of the personal dashboard
//retrieves all snippet data necessary to render each snippet preview
//username argument is retrieved from JWT
export const GET_MY_SNIPPETS = gql`
query MySnippets($username: String!) {
  mySnippets(username: $username) {
    _id
    username
    snippetTitle
    snippetText
    overallProps
    formattedCreationDate
    formattedEditDate
  }
}`;

//query to retrieve a specific user's saved snippets by username
//used on the 'saved snippets' tab of the personal dashboard
//retrieves all snippet data necessary to render each snippet preview
//username argument is retrieved from JWT
export const GET_SAVED_SNIPPETS = gql`
query UserSavedSnippets($username: String!) {
  userSavedSnippets(username: $username) {
    savedSnippets
    {
      _id
      username
      snippetTitle
      snippetText
      overallProps
      formattedCreationDate
      formattedEditDate
    }
  }
}`;

//query to retrieve a specific user's comments by username
//used on the 'my comments' tab of the personal dashboard
//retrieves all comment data, and parent snippet data necessary to render a small preview
//username argument is retrieved from JWT
export const GET_USER_COMMENTS = gql`
query UserComments($username: String!) {
  userComments(username: $username) {
    username
    commentText
    formattedCreationDate
    formattedEditDate
    parentSnippetId {
      _id
      username
      snippetTitle
      formattedCreationDate
      formattedEditDate
    }
  }
}`;

//query to retrieve a specific snippet's full data by ObjectId
//used on an individual snippet's page (i.e. after clicking a snippet preview & being routed to that snippet's dedicated page)
//retrieves all snippet data, including code blocks & resources, plus all comments & comment data
//snippetId argument is retrieved from route parameters
export const GET_INDIVIDUAL_SNIPPET = gql`
query OneSnippet($snippetId: ID!) {
  oneSnippet(snippetId: $snippetId) {
    _id
    username
    snippetTitle
    snippetText
    snippetCode {
      language
      code
    }
    comments {
      _id
      username
      commentText
      formattedCreationDate
      formattedEditDate
    }
    resources {
      title
      link
    }
    tags
    overallProps
    formattedCreationDate
    formattedEditDate
  }
}`;
