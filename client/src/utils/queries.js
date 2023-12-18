import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
query Query {
  allUsers {
    username
    snippets {
      snippetCode {
        code
      }
    }
  }
}
`;

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
