<template>
    <div class=" flex flex-row mb-5 bg-white p-2">
        <span @click="toHome" class="font-sans font-semibold cursor-pointer">Exercise #3</span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import routeNames from '@/shared/enums/route-names';
import router from '@/router';

export default defineComponent({
  name: 'NavBar',
  setup() {
    function toHome() {
      router.push({ name: routeNames.Home });
    }

    return {
      toHome,
    };
  },
});
</script>
