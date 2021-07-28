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

  query SearchUsersQuery($query: String!, $limit: Int!, $after: String, $before: String,) {
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
      }
    }
  }
`;

const SEARCH_USER = gql`
  ${USER_FRAGMENT}

  query SearchUserQuery($login: String!, $after: String, $before: String) {
    user(login: $login) {
      ...user
    }
  }
`;

const GET_NEXT_USERS = gql`
  ${USER_FRAGMENT}
  query getNextUsers($cursor: String!) {
    search(query: $query, type: USER, first: $limit, after: $cursor ) {
      userCount
      edges {
        cursor
        node {
          ...user
        }
      }
    }
  }
`;

export {
  SEARCH_USERS,
  SEARCH_USER,
  GET_NEXT_USERS,
};
