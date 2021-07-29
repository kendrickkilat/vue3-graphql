<template>
    <div v-if="loading">...Loading</div>
    <div v-else-if="error">ERROR: {{error}}</div>
    <div v-else-if="users.length">
        <ul class = "">
            <li v-for="user in users" v-bind:key="user.node.id">
                <User v-if="user.node.id !== undefined"
                :user="user.node" :search-options="searchOptions"/>
            </li>
        </ul>
        <div class="flex mx-5 mb-3">
          <button class="flex-1 mr-1 p-2" @click="prevPage()">Previous</button>
          <button class="flex-1 ml-1 p-2" @click="nextPage()">Next</button>
        </div>
    </div>
</template>
<script lang ="ts">
import { defineComponent, PropType } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { SEARCH_USERS } from '@/graphql/queries';
import User from '@/users/components/user.vue';
import { SearchOptions } from '@/shared/interfaces/query-options';

export default defineComponent({
  name: 'UserList',
  components: {
    User,
  },
  props: {
    searchOptions: {
      type: Object as PropType<SearchOptions>,
      required: false,
      default: () => ({
        query: '',
        limit: 10,
        start: null,
        last: null,
        after: null,
        before: null,
      }),
    },
  },
  setup(props) {
    console.log(props.searchOptions);
    const {
      result, loading, error, fetchMore,
    } = useQuery(SEARCH_USERS, props.searchOptions);

    const users = useResult(
      result,
      [],
      (data) => data.search && data.search.edges, // specify on what data to return
    );

    function nextPage() {
      console.log(result.value.search.pageInfo.endCursor, '<- endCursor');
      fetchMore({
        variables: {
          after: result.value.search.pageInfo.endCursor,
          before: null,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.search.edges;
          const { pageInfo } = fetchMoreResult.search;

          console.log(newEdges, '<-newEdges');
          console.log(pageInfo, '<-pageInfo');

          console.log(previousResult, '<-previousresult');

          return newEdges.length ? {
            ...previousResult,
            search: {
              ...previousResult.search,
              // Concat edges
              edges: [
                ...newEdges,
              ],
              // Override with new pageInfo
              pageInfo,
            },
          } : previousResult;
        },
      });
    }

    function prevPage() {
      console.log(result.value.search.pageInfo.startCursor, '<- startCursor');
      fetchMore({
        variables: {
          before: result.value.search.pageInfo.startCursor,
          after: null,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.search.edges;
          const { pageInfo } = fetchMoreResult.search;

          console.log(newEdges, '<-newEdges Before');

          return newEdges.length ? {
            ...previousResult,
            search: {
              ...previousResult.search,
              // Concat edges
              edges: [
                ...newEdges,
              ],
              // Override with new pageInfo
              pageInfo,
            },
          } : previousResult;
        },
      });
    }
    return {
      loading,
      error,
      users,
      nextPage,
      prevPage,
    };
  },
});
</script>
