<template>
  <div class="home">
    <h1>Search <span class="text-green-500">GitHub</span> Users</h1>
    <SearchBar @search="search"/>
    <UserList :search-options="searchOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import SearchBar from '@/users/components/search-bar.vue';
import UserList from '@/users/components/user-list.vue';
import { SearchOptions } from '@/shared/interfaces/query-options';

export default defineComponent({
  name: 'Home',
  components: {
    SearchBar,
    UserList,
  },
  setup() {
    const searchOptions: SearchOptions = reactive({
      query: '',
      limit: 3,
      after: null,
      before: null,
    });

    const search = (query: string) => {
      searchOptions.query = query;
    };

    return {
      searchOptions,
      search,
    };
  },
});
</script>
