<script setup lang="ts">
import useUserAlbums from "~/composables/useUserAlbums";

import type { Album } from "@prisma/client";
const route = useRoute();

const props = defineProps<{
  albums: Album[];
}>();

const hoveredImageId = ref(null);

const toggleHovered = (id: any) => {
  hoveredImageId.value = id;
};

const clearHovered = () => {
  hoveredImageId.value = null;
};
</script>

<template>
  <div
    class="grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(250px,0.5fr))] gap-1"
  >
    <div
      v-for="album in albums"
      :key="album.id"
      @mouseenter="toggleHovered(album?.id)"
      @mouseleave="clearHovered"
      class="bg-textSecondary aspect-square overflow-hidden flex items-center justify-center rounded-md m-0 relative"
    >
      <div
        class="absolute origin-top-left text-4xl p-2 top-0 w-full text-textSecondary bg-textPrimary animate-fade animate-once animate-duration-300 animate-ease-linear z-10 animate-normal"
      >
        <h1 class="w-full text-wrap">{{ album.name }}</h1>
      </div>
      <NuxtLink
        class="w-full h-full"
        :to="{ path: `/user/${route.params.userID}/albums/${album.id}` }"
      >
        <NuxtImg
          width="500"
          height="500"
          :src="album.assignedArtworks[0].artworkImage"
          :alt="album.name"
          class="w-full h-full opacity-80 object-cover rounded-md"
        ></NuxtImg>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
