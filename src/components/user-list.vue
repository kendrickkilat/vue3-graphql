<template>
    <div v-if="loading">...Loading</div>
    <div v-else-if="error">ERROR: {{error}}</div>
    <div v-else-if="users.length">
        <ul>
            <li v-for="user in users" v-bind:key="user.node.id">
                <User v-if="user.node.id !== undefined"
                :user="user.node" :search-options="searchOptions"/>
            </li>
        </ul>
    </div>
</template>
<script lang ="ts">
import { defineComponent, toRefs, watchEffect } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import SEARCH_USER from '@/graphql/documents';
import User from '@/components/user.vue';

export default defineComponent({
  name: 'RepositoryList',
  components: {
    User,
  },
  props: {
    searchOptions: {
      type: Object,
      default() {
        return {
          query: '',
          limit: 10,
        };
      },
    },
  },
  setup(props: { searchOptions: Record<string, number> }) {
    const { searchOptions } = toRefs(props);
    const { result, loading, error } = useQuery(SEARCH_USER, searchOptions);

    const users = useResult(
      result,
      [],
      (data) => data?.search && data.search.edges, // specify on what data to return
    );
    watchEffect(() => {
      console.log(searchOptions.value);
      console.log(users.value);
    });

    return {
      loading,
      error,
      users,
    };
  },
});
</script>
