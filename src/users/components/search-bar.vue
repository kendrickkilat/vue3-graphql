<template>
    <div class="flex flex-row m-5">
      <div class="flex-1">
        <input
        class="p-3 h-full w-full"
        placeholder="Ex. React"
        v-model="searchValue"
    />
      </div>
      <div class="flex-2">
        <button @click="searchItem()">Search</button>
      </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  setup(_, { emit }) {
    const searchValue = ref('');
    function searchItem() {
      console.log(searchValue.value);
      emit('search', searchValue.value);
    }

    return {
      searchItem,
      searchValue,
    };
  },
});
</script>
