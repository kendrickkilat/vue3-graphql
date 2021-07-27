import { provide } from 'vue';

import {
  ApolloClient, InMemoryCache, HttpLink, ApolloLink, from,
} from '@apollo/client/core';
import { ApolloClients } from '@vue/apollo-composable';

const token = process.env.VUE_APP_GITHUB_ACCESS_TOKEN;

const additiveLink = from([
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }:string | any) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    }));
    return forward(operation);
  }),
  new HttpLink({ uri: 'https://api.github.com/graphql' }),
]);

const defaultClient = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache(),
});

export default function initApollo() {
  return provide(
    ApolloClients, {
      default: defaultClient,
    },
  );
}
