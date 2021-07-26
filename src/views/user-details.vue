<template>
    <div v-if="loading">...Loading</div>
    <div v-if="error">{{ error.message }}</div>
    <div v-if="result" class="flex flex-col m-5">
        <div @click="toHome" class="text-blue-500 cursor-pointer font-semibold text-3xl place-self-start">Home</div>
        <h2 class="text-green-400 text-5xl font-semibold place-self-start">{{userDetails.login.toUpperCase()}}</h2>
        <div class="grid grid-cols-2 justify-items-start bg-white shadow-md p-5 my-5">
            <span>Username: </span><span class="text-green-400 font-semibold">{{ userDetails.login }}</span>
            <span>Email: </span><span>{{userDetails.email ? userDetails.email : 'N/A'}}</span>
            <span>Name: </span><span>{{userDetails.name ? userDetails.name : 'N/A'}}</span>
            <span>Github Link: </span><a class="text-green-400" target="_blank" :href="userDetails.url">{{userDetails.url ? userDetails.url : 'N/A'}}</a>
        </div>
        <div class="text-5xl my-5">Repository List</div>
        <div class="grid grid-cols-1 md:grid-cols-3">
            <a :href="repo.url" v-for="repo in userDetails.repositories.nodes"
                v-bind:key="repo.id" target="_blank">
            <span
                class="flex-1 flex flex-col p-3 m-2 bg-white shadow-md h-36 max-h-36"
            >
                <span class="flex-2 text-xl place-self-start">{{ repo.name }}</span>
                <span class="flex-1 place-self-start text-green-400">{{ repo.url }}</span>
                <span class="flex-1 text-sm place-self-start text-gray-400">{{ repo.id }}</span>
            </span>
        </a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SEARCH_USER } from '@/graphql/queries';
import { useQuery, useResult } from '@vue/apollo-composable';
import router from '@/router';
import RouteNames from '@/enums/route-names';

export default defineComponent({
  name: 'UserDetails',
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
