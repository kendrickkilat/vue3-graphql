import { gql } from '@apollo/client/core';

const USER_FRAGMENT = gql`
  fragment user on User {
        id
        email
        login
        avatarUrl(size: 100)
        url
        name
        repositories(first: 10, after: $after, before: $before) {
        totalCount
        edges {
          cursor
          node {
            id
            name
            url
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
        }
        
    }
`;

const SEARCH_USERS = gql`
  ${USER_FRAGMENT}

  query SearchUsersQuery(
    $query: String!,
    $limit: Int!,
    $after: String,
    $before: String,
    ) {
    search(query: $query, type: USER,  last: $limit, after: $after, before: $before ) {
      userCount
      edges {
        cursor
        node {
          ...user
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const SEARCH_USER = gql`
  query SearchUserQuery($login: String!, $after: String, $before: String, $first: Int, $last: Int) {
    user(login: $login) {
      id
        email
        login
        avatarUrl(size: 100)
        url
        name
        repositories(first: $first, last:$last after: $after, before: $before) {
        totalCount
        edges {
          cursor
          node {
            id
            name
            url
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
        }
    }
  }
`;

export {
  SEARCH_USERS,
  SEARCH_USER,
};
