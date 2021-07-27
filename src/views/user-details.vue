<template>
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
        <RepositoryList :repositories="userDetails.repositories.nodes"/>
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
import RepositoryList from '@/components/repository-list.vue';

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
    });
    const { result, loading, error } = useQuery(SEARCH_USER, variables.value);
    const userDetails = useResult(
      result,
      [],
      (data) => data.user,
    );
    function toHome() {
      router.push({ name: RouteNames.Home });
    }
    return {
      userDetails,
      loading,
      error,
      result,
      toHome,
    };
  },
});
</script>
