import { createApp, h, provide } from 'vue';

import {
  ApolloClient, InMemoryCache, HttpLink, ApolloLink, from,
} from '@apollo/client/core';
import { ApolloClients } from '@vue/apollo-composable';
import App from './App.vue';
import router from './router';
import '@/assets/css/style.css';

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

createApp({
  setup() {
    provide(
      ApolloClients, {
        default: defaultClient,
      },
    );
  },
  render() {
    return h(App);
  },
}).use(router).mount('#app');
