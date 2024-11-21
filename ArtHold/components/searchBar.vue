<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
//import { useFilteredArtworksStore } from "~/stores/filteredArtworks";

const input = ref("");
const router = useRouter();
const searchHistory = ref<string[]>([]);
const isActive = ref(false);
//const store = useFilteredArtworksStore();

const updateQueryInURL = useDebounceFn(() => {
  const query = input.value.trim();
  if (query) {
    router.push({ query: { query } });
    saveQuery(query);
  }
}, 300);

const saveQuery = useDebounceFn((query: string) => {
  if (searchHistory.value.find((element) => element === query)) {
    return;
  }
  if (searchHistory.value.length > 5) {
    searchHistory.value.shift();
  }
  searchHistory.value.push(query);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory.value));
}, 600);

const loadSearchHistory = () => {
  const history = localStorage.getItem("searchHistory");
  if (history) {
    searchHistory.value = JSON.parse(history);
  }
};

const inputFromHistory = (queryListing: string) => {
  input.value = queryListing;
  updateQueryInURL();
};

onMounted(() => {
  loadSearchHistory();
});
</script>

<template>
  <div class="relative">
    <input
      v-model="input"
      @input="updateQueryInURL"
      @focus="isActive = true"
      @blur="isActive = false"
      class="bg-textSecondary text-black rounded-sm px-4 py-2 min-w-44 placeholder-gray-dark focus:outline-none text-primary focus:text-primary"
      type="text"
      placeholder="Search..."
    />
    <NuxtImg
      src="/search-alt-2-svgrepo-com.svg"
      alt="Upload"
      class="w-6 h-max absolute right-3 top-1/2 transform -translate-y-1/2"
    />
    <ul
      v-if="isActive"
      class="bg-textSecondary absolute mt-1 rounded-sm min-w-44"
    >
      <li
        v-for="(query, index) in searchHistory.slice().reverse()"
        :key="index"
        @mousedown="inputFromHistory(query)"
        @hover="isActive = true"
        class="p-1 w-full hover:bg-textPrimary hover:text-textSecondary cursor-pointer"
      >
        {{ query }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
::placeholder {
  color: #2f2f2f;
}
</style>
