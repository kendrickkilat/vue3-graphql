<template>
    <div>new</div>
    <div v-if="loading">...Loading</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else-if="result" class="flex flex-col m-5">
        <div @click="toHome" class="text-green-300 underline cursor-pointer font-semibold text-xl place-self-start">Home</div>
        <h2 class="text-green-400 text-5xl font-semibold place-self-start">{{userDetails.login.toUpperCase()}}</h2>
        <div class="grid grid-cols-2 justify-items-start bg-white shadow-md p-5 my-5">
            <span>Username: </span><span class="text-green-400 font-semibold">{{ userDetails.login }}</span>
            <span>Email: </span><span>{{userDetails.email ? userDetails.email : 'N/A'}}</span>
            <span>Name: </span><span>{{userDetails.name ? userDetails.name : 'N/A'}}</span>
            <span>Github Link: </span><a class="text-green-400" target="_blank" :href="userDetails.url">{{userDetails.url ? userDetails.url : 'N/A'}}</a>
        </div>
        <RepositoryList :repositories="userDetails.repositories.edges"/>
        <div class="flex mx-5 mb-3">
          <button class="flex-1 mr-1 p-2" @click="prevPage()">Previous</button>
          <button class="flex-1 ml-1 p-2" @click="nextPage()">Next</button>
        </div>
    </div>
    <div v-else-if="!result">
      User Data Not Found
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SEARCH_USER } from '@/graphql/queries';
import { useQuery, useResult } from '@vue/apollo-composable';
import router from '@/router';
import RouteNames from '@/enums/route-names';
import RepositoryList from '@/repositories/components/repository-list.vue';
import { UserOptions } from '@/shared/interfaces/query-options';

export default defineComponent({
  name: 'UserDetails',
  components: {
    RepositoryList,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    console.log(props.id);
    // const { SEARCH_USER } = useQueries();
    const variables = ref({
      login: props.id,
      after: null,
      before: null,
      first: 10,
      last: null,
    } as UserOptions);
    const {
      result, loading, error, fetchMore,
    } = useQuery(SEARCH_USER, variables.value);
    const userDetails = useResult(
      result,
      [],
      (data) => data.user,
    );
    function toHome() {
      router.push({ name: RouteNames.Home });
    }
    function nextPage() {
      console.log(result.value.user.repositories.pageInfo.endCursor, '<- endCursor');
      fetchMore({
        variables: {
          after: result.value.user.repositories.pageInfo.endCursor,
          before: null,
          first: 10,
          last: null,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.user.repositories.edges;
          const { pageInfo } = fetchMoreResult.user.repositories;

          console.log(newEdges, '<-newEdges');
          console.log(pageInfo, '<-pageInfo');

          console.log(previousResult, '<-previousresult');

          return newEdges.length ? {
            ...previousResult,
            user: {
              ...previousResult.user,
              repositories: {
                ...previousResult.user.repositories,
                edges: [
                  ...newEdges,
                ],
                pageInfo,
              },
            },
          } : previousResult;
        },
      });
    }

    function prevPage() {
      console.log(result.value.user.repositories.pageInfo.startCursor, '<- startCursor');
      fetchMore({
        variables: {
          before: result.value.user.repositories.pageInfo.startCursor,
          after: null,
          last: 10,
          first: null,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.user.repositories.edges;
          const { pageInfo } = fetchMoreResult.user.repositories;

          console.log(newEdges, '<-newEdges Before');

          console.log(previousResult, '<-previousresult');

          return newEdges.length ? {
            ...previousResult,
            user: {
              ...previousResult.user,
              repositories: {
                ...previousResult.user.repositories,
                edges: [
                  ...newEdges,
                ],
                pageInfo,
              },
            },
          } : previousResult;
        },
      });
    }

    return {
      userDetails,
      loading,
      error,
      result,
      toHome,
      nextPage,
      prevPage,
    };
  },
});
</script>
