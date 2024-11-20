<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
//import { useFilteredArtworksStore } from "~/stores/filteredArtworks";

let input = ref("");
const router = useRouter();
//const store = useFilteredArtworksStore();

const updateQueryInURL = useDebounceFn(() => {
  const query = input.value.trim();
  router.push({ query: { query } });
}, 300);
</script>

<template>
  <div class="relative">
    <input
      @input="updateQueryInURL"
      class="bg-textSecondary text-black rounded-sm px-4 py-2 min-w-44 placeholder-gray-dark focus:outline-none text-primary focus:text-primary"
      type="text"
      placeholder="Search..."
      v-model="input"
    />
    <NuxtImg
      src="/search-alt-2-svgrepo-com.svg"
      alt="Upload"
      class="w-6 h-max absolute right-3 top-1/2 transform -translate-y-1/2"
    />
  </div>
</template>

<style scoped>
::placeholder {
  color: #2f2f2f;
}
</style>
