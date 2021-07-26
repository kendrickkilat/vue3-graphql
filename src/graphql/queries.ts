import { gql } from '@apollo/client/core';

const USER_FRAGMENT = gql`
  fragment user on User {
        id
        email
        login
        avatarUrl(size: 100)
        url
        name
        repositories(first: 10) {
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

// export default SEARCH_USERS;

const SEARCH_USER = gql`
  ${USER_FRAGMENT}

  query SearchUserQuery($login: String!) {
    user(login: $login) {
      ...user
    }
  }
`;

export {
  SEARCH_USERS,
  SEARCH_USER,
};

// export default SEARCH_USER;
