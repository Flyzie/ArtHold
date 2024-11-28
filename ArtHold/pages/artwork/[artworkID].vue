<script setup lang="ts">
import useUser from "~/composables/useUser";
import useArtwork from "~/composables/useArtwork";
const route = useRoute();

const { data } = useAuth();

const artwork = await useArtwork(Number(route.params.artworkID));
const userData = await useUser(Number(artwork.value?.userID));

const isUser = computed(() => {
  if (data.value?.user.id === Number(artwork.value?.userID)) {
    return true;
  } else {
    return false;
  }
});
</script>

<template>
  <div class="grid grid-cols-3 grid-rows-1 w-full p-5 h-full gap-4">
    <div class="col-span-2 h-full bg-textPrimary rounded-md p-5">
      <NuxtImg
        :src="artwork?.artworkImage"
        class="w-full object-contain rounded-md h-full"
      ></NuxtImg>
    </div>
    <div
      class="col-span-1 min-w-40 flex flex-col justify-start items-start p-5 gap-5 bg-secondary rounded-md"
    >
      <div class="flex flex-wrap gap-6">
        <NuxtImg
          :src="userData?.image ?? ''"
          fit="cover"
          width="200"
          height="200"
          class="rounded-full aspect-square mb-6 border-solid border-8 border-textSecondary"
        ></NuxtImg>
        <div>
          <h1 class="text-3xl bg-textPrimary text-textSecondary p-1">
            {{ userData?.name }}
          </h1>
          <p class="text-2xl text-white p-1">{{ userData?.description }}</p>
          <p class="text-xl text-white p-1">
            Likes: {{ userData?.likedArtworks }}
          </p>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <h1 class="text-8xl bg-textPrimary text-textSecondary p-1 text-wrap">
          {{ artwork?.title }}
        </h1>
        <NuxtLink
          v-if="isUser"
          class="p-1 bg-textSecondary text-textPrimary rounded-lg hover:bg-textPrimary hover:text-textSecondary"
          >Edit Artwork</NuxtLink
        >
      </div>
      <div>
        <p class="text-3xl text-white px-1">{{ artwork?.description }}</p>
        <p class="text-xl text-white px-1">Likes: {{ artwork?.likes }}</p>
        <LikeButton class="w-full" :artworkID="artwork?.id"></LikeButton>
        <p class="text-gray mt-10">Posted:</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
