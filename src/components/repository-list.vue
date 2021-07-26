<template>
        <div class="text-5xl my-5">Repository List</div>
        <div class="grid grid-cols-1 md:grid-cols-3">
            <a :href="repo.url" v-for="repo in repositories"
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
</template>
<script lang ="ts">
import {
  defineComponent, PropType,
} from 'vue';
import { Repository } from '@/generated/graphql';

export default defineComponent({
  name: 'RepositoryList',
  props: {
    repositories: {
      type: Object as PropType<Repository[]>,
      required: true,
    },
  },
});
</script>
