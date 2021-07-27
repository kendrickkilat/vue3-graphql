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
    </div>
</template>
<script lang ="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { SEARCH_USERS } from '@/graphql/queries';
// import useQueries from '@/composables/use-queries';
import User from '@/components/user.vue';
import { SearchOptions } from '@/interfaces/search-options';

export default defineComponent({
  name: 'UserList',
  components: {
    User,
  },
  props: {
    searchOptions: {
      type: Object as PropType<SearchOptions>,
      required: false,
      default() {
        return {
          query: '',
          limit: 10,
        };
      },
    },
  },
  setup(props: {searchOptions: SearchOptions}) {
    const { searchOptions } = toRefs(props);
    // const { SEARCH_USERS } = useQueries();
    const { result, loading, error } = useQuery(SEARCH_USERS, searchOptions);

    const users = useResult(
      result,
      [],
      (data) => data.search && data.search.edges, // specify on what data to return
    );

    return {
      loading,
      error,
      users,
    };
  },
});
</script>
