<script setup lang="ts">
import type { Artwork } from "@prisma/client";
import type { ArtworkWithUser } from "~/composables/useArtwork";
const route = useRoute();
const artworks = ref<Artwork[]>([]);

const currentPage = ref(1);
const maxPages = ref(2);

const fetchArtworks = async (page: number) => {
  const query = route.query.query as string;
  const tags = route.query.tags as string;
  if (currentPage.value <= maxPages.value) {
    const data = await $fetch(`/api/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        q: query || "",
        tags: tags || "",
        page,
        limit: 25,
      },
    });

    if (data) {
      artworks.value.push(...data.artworks);
    }

    currentPage.value += 1;
    maxPages.value = data.maxPages;
    //console.log(currentPage.value);
    //console.log(maxPages.value);
    return data;
  } else {
    console.log("max pages reached: ", maxPages.value);
    return;
  }
};

const handleSearch = async () => {
  currentPage.value = 1;
  artworks.value = [];
  try {
    await fetchArtworks(currentPage.value);
    console.log("search triggered");
  } catch (error) {
    console.error("Error fetching artworks:", error);
  }
};

watch(() => route.fullPath, handleSearch);

onMounted(async () => {
  currentPage.value = 1;
  await fetchArtworks(currentPage.value);
});
</script>
<template>
  <div class="p-4 px-6 w-full">
    <ArtworksGrid
      :artworks="(artworks as ArtworkWithUser[])"
      @intersected="fetchArtworks(currentPage)"
    ></ArtworksGrid>
  </div>
</template>
