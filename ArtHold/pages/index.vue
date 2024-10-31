<script setup lang="ts">
const { data } = await useFetch("/api/me");
</script>
<template>
  <h1 class="text-4xl text-textSecondary">{{ data }}</h1>
  <div class="p-4 px-6 w-full"><ArtworksGrid></ArtworksGrid></div>
</template>
