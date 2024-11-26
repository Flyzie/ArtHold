<script setup lang="ts">
import type { Artwork } from "@prisma/client";
const route = useRoute();
const artworks = ref<Artwork[]>([]);

const currentPage = ref(1);

const fetchArtworks = async (page: number) => {
  const query = route.query.query as string;
  const tags = route.query.tags as string;
  const { data, error } = await useFetch<Artwork[]>(`/api/search`, {
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

  if (error.value) {
    throw error.value;
  }

  if (data.value) {
    artworks.value.push(...data.value);
  }

  currentPage.value += 1;
  console.log(currentPage.value);
  return data.value;
};

const handleSearch = async () => {
  currentPage.value = 1;
  try {
    const data = await fetchArtworks(currentPage.value);
    artworks.value = data;
  } catch (error) {
    console.error("Error fetching artworks:", error);
  }
};

watch(() => route.fullPath, handleSearch);

onMounted(() => {
  currentPage.value = 1;
  fetchArtworks(currentPage.value);
});
</script>
<template>
  <div class="p-4 px-6 w-full">
    <ArtworksGrid
      :artworks="artworks"
      @intersected="fetchArtworks(currentPage)"
    ></ArtworksGrid>
  </div>
</template>
