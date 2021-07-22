<template>
<a :href="user.url" target="_blank">
  <div class = "flex" >
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
</a>
</template>

<script lang="ts">
import { User } from '@/interfaces/user';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Repository',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
    searchOptions: {
      type: Object,
      required: true,
    },
  },
});
</script>
