<template>
  <div class = "flex cursor-pointer" @click="toUserDetails()">
    <!-- {{userNode.login}} - {{userNode.url}} - {{userNode.avatarUrl}} -->
    <div class="p-5 w-full bg-white m-5 shadow-md flex flex-row">
      <div class="flex-3">
        <img :src="user.avatarUrl ? user.avatarUrl : '@/assets/logo.png'"
        class="mx-2 rounded-full" height=100 width=100>
      </div>
      <div class="flex-1 flex-col justify-items-end">
        <h2 class="text-lg">{{user.name ? user.name : 'Github User'}}</h2>
        <h2 class="text-md text-gray">{{user.login}}</h2>
        <a :href="user.url" class="text-green-500">{{user.url}}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { defineComponent, PropType } from 'vue';
import rn from '@/enums/route-names';
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
