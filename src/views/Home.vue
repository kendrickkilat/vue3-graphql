<template>
  <div class="home">
    <h1>Search <span class="text-green-500">GitHub</span> Users</h1>
    <SearchBar @search="search"/>
    <UserList :search-options="searchOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import SearchBar from '@/components/search-bar.vue';
import UserList from '@/components/user-list.vue';
import { SearchOptions } from '@/interfaces/search-options';

export default defineComponent({
  name: 'Home',
  components: {
    SearchBar,
    UserList,
  },
  setup() {
    const searchOptions: SearchOptions = reactive({
      query: '',
      limit: 10,
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
