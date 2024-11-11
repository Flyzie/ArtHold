<script setup lang="ts">
const { data } = await useFetch("/api/me");
import useAllArtworks from "~/composables/useAllArtworks";

const artworks = await useAllArtworks();
</script>
<template>
  <div class="p-4 px-6 w-full">
    <ArtworksGrid :artworks="artworks"></ArtworksGrid>
  </div>
</template>
