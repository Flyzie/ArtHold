<script setup lang="ts">
import useAlbum from "~/composables/useAlbum";

const route = useRoute();

const albumID = Number(route.params.albumID);

const userAlbum = await useAlbum(albumID);
</script>

<template>
  <ArtworksGrid :artworks="userAlbum?.assignedArtworks ?? []"></ArtworksGrid>
</template>
<style scoped></style>
