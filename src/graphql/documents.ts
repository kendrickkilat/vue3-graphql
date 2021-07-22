import { gql } from '@apollo/client/core';

const USER_FRAGMENT = gql`
  fragment user on User {
        id
        email
        login
        avatarUrl(size: 100)
        url
        name
    }
`;

const SEARCH_USER = gql`
  ${USER_FRAGMENT}

  query SearchRepoQuery($query: String!, $limit: Int!) {
    search(query: $query, type: USER, first: $limit) {
      edges {
        node {
          ...user
        }
      }
    }
  }
`;

export default SEARCH_USER;
