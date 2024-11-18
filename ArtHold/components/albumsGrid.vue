<script setup lang="ts">
import useUserAlbums from "~/composables/useUserAlbums";
const { data } = useAuth();
import type { Album } from "@prisma/client";
const route = useRoute();

const props = defineProps<{
  albums: Album[];
}>();

const hoveredImageId = ref(null);
const albumName = ref("");
const isClicked = ref(false);

const toggleHovered = (id: any) => {
  hoveredImageId.value = id;
};

const clearHovered = () => {
  hoveredImageId.value = null;
};

const handleUpload = async (e: any) => {
  const formData = new FormData();
  formData.append("name", albumName.value);
  formData.append("userId", String(data.value?.user.id));

  for (const [k, v] of formData.entries()) {
    console.log(k, v);
  }

  const response = await fetch("/api/albums/album", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.statusMessage);
  }

  const useData = await response.json();
  console.log("Album Created succesfully:", useData);
};
</script>

<template>
  <div
    class="grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(150px,0.2fr))] gap-1"
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
        :to="{ path: `/${route.params.userID}/albums/${album.id}` }"
      >
        <NuxtImg
          width="500"
          height="500"
          :src="album.assignedArtworks[0]?.artworkImage"
          :alt="album.name"
          class="w-full h-full opacity-80 object-cover rounded-md"
        ></NuxtImg>
      </NuxtLink>
    </div>
    <div
      class="border-4 border-textSecondary border-dotted aspect-square overflow-hidden flex flex-col items-center justify-center rounded-md m-0 relative"
    >
      <button class="text-textSecondary" @click="isClicked = !isClicked">
        create new album
      </button>
      <form
        @submit.preven="handleUpload"
        v-if="isClicked"
        class="w-full flex flex-col items-center justify-center gap-2"
      >
        <input
          v-model="albumName"
          type="text"
          placeholder="Album Name"
          id="albumName"
          name="albumName"
          class="p-1 w-1/2 rounded-sm"
        />
        <input
          type="submit"
          class="text-2xl cursor-pointer bg-textSecondary p-1 w-1/2 rounded-md hover:bg-textPrimary hover:text-textSecondary"
          value="Add Album"
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
.nuxt-link {
  display: block;
  padding: 0;
  margin: 0;
}
</style>
