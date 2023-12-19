import { gql } from "@apollo/client";

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
        }
        formattedCreationDate
        formattedEditDate
        comments {
          commentText
          username
          _id
          commentCode {
            code
          }
          formattedCreationDate
          formattedEditDate
        }
        overallProps
      }
    }
  }
`;

export const GET_USER_SNIPPETS = gql`
query UserSnippets($username: String!, $tags: [String])
{
  userSnippets(username: $username, tags: $tags)
  {
    _id
    username
    snippetTitle
    snippetText
    tags
    overallProps
    formattedCreationDate
    formattedEditDate
  }
}`;

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
