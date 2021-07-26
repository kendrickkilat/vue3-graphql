import { gql } from '@apollo/client/core';

export default function useQueries() {
  const USER_FRAGMENT = gql`
  fragment user on User {
        id
        email
        login
        avatarUrl(size: 100)
        url
        name
        repositories(first: 5) {
            nodes {
                id
                name
                url
            }
    }
    }
`;

  const SEARCH_USERS = gql`
  ${USER_FRAGMENT}

  query SearchUsersQuery($query: String!, $limit: Int!) {
    search(query: $query, type: USER, first: $limit) {
      edges {
        node {
          ...user
        }
      }
    }
  }
`;

  const SEARCH_USER = gql`
  ${USER_FRAGMENT}

  query SearchUserQuery($login: String!) {
    user(login: $login) {
      ...user
    }
  }
`;

  return {
    SEARCH_USER,
    SEARCH_USERS,
  };
}
