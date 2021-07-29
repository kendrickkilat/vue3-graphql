<template>
  <div class = "flex cursor-pointer" @click="toUserDetails()">
    <!-- {{userNode.login}} - {{userNode.url}} - {{userNode.avatarUrl}} -->
    <div class="p-5 w-full bg-white m-5 shadow-md flex flex-row">
      <div class="flex-3">
        <img :src="user.avatarUrl ? user.avatarUrl : '@/assets/logo.png'"
        class="mx-2 rounded-full" height=100 width=100>
      </div>
      <div class="flex-1 flex flex-col mx-5">
        <h2 class="text-lg place-self-start">{{user.name ? user.name : 'Github User'}}</h2>
        <h2 class="text-md text-gray place-self-start">{{user.login}}</h2>
        <h2 class="text-md text-gray place-self-start">{{user.email ? user.email : 'no-email-provided'}}</h2>
        <h2 class="text-md text-gray place-self-start">No. of Repositories: {{user.repositories.totalCount}}</h2>
        <a :href="user.url" class="text-green-500 place-self-start">{{user.url}}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { defineComponent, PropType } from 'vue';
import rn from '@/shared/enums/route-names';
import { User } from '@/generated/graphql';

export default defineComponent({
  name: 'Repository',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup(prop) {
    function toUserDetails() {
      router.push({ name: rn.UserDetails, params: { id: prop.user.login } });
    }

    return {
      toUserDetails,
    };
  },
});
</script>
