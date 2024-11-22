<script setup lang="ts">
import type { Artwork } from "@prisma/client";
import useAllArtworks from "~/composables/useAllArtworks";
const route = useRoute();
const allArtworks = await useAllArtworks();

const artworks = ref(allArtworks.value);

const handleSearch = async () => {
  //console.log("watcher triggered");
  const query = route.query.query as string;
  const tags = route.query.tags as string;

  const tagIds = tags ? tags.split(",").map(Number) : [];

  if (query || tagIds.length) {
    //console.log("query detected triggered getting filtered");
    const { data, error } = await useFetch<Artwork[]>(
      `/api/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (error.value) {
      throw error.value;
    }
    artworks.value = data.value;
  } else {
    //console.log("query not triggered rendering all");
    artworks.value = allArtworks.value;
  }
};
watch(() => route.fullPath, handleSearch, { immediate: true });
</script>
<template>
  <div class="p-4 px-6 w-full">
    <ArtworksGrid :artworks="artworks"></ArtworksGrid>
  </div>
</template>
