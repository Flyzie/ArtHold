<script setup lang="ts">
const route = useRoute();

// Let's talk what I did here with useFetch, and how it should be used for data fetching.
// THis is just an example, it doesn't support infinite scrolling.

// Read the docs carefullt: https://nuxt.com/docs/api/composables/use-fetch
// Useful video to help: https://www.youtube.com/watch?v=njsGVmcWviY

const currentPage = ref(1);

const searchParams = computed(() => ({
  q: route.query.query || "",
  tags: route.query.query || "",
  page: currentPage.value,
  limit: 25,
}));

const { data } = useFetch(`/api/search`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  params: searchParams,
});

const maxPages = computed(() => data.value?.maxPages || 1);

const artworks = computed(() => data.value?.artworks || []);

function onTableIntersected() {
  // TODO
}

// const artworks = ref<Artwork[]>([]);

// const currentPage = ref(1);
// const maxPages = ref(2);

// const fetchArtworks = async (page: number) => {
//   const query = route.query.query as string;
//   const tags = route.query.tags as string;
//   if (currentPage.value <= maxPages.value) {
//     const data = await $fetch(`/api/search`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       params: {
//         q: query || "",
//         tags: tags || "",
//         page,
//         limit: 25,
//       },
//     });

//     if (data) {
//       artworks.value.push(...data.artworks);
//     }

//     currentPage.value += 1;
//     maxPages.value = data.maxPages;
//     //console.log(currentPage.value);
//     //console.log(maxPages.value);
//     return data;
//   } else {
//     console.log("max pages reached: ", maxPages.value);
//     return;
//   }
// };

// const handleSearch = async () => {
//   currentPage.value = 1;
//   artworks.value = [];
//   try {
//     await fetchArtworks(currentPage.value);
//     console.log("search triggered");
//   } catch (error) {
//     console.error("Error fetching artworks:", error);
//   }
// };

// watch(() => route.fullPath, handleSearch);

// onMounted(async () => {
//   currentPage.value = 1;
//   await fetchArtworks(currentPage.value);
// });
</script>
<template>
  <div class="p-4 px-6 w-full">
    <ArtworksGrid
      :artworks="artworks"
      @intersected="onTableIntersected"
    ></ArtworksGrid>
  </div>
</template>
