<script setup lang="ts">
import useUser from "~/composables/useUser";
const route = useRoute();

const { status, data } = useAuth();

const userData = await useUser(Number(route.params.userID));
</script>

<template>
  <div class="grid grid-cols-3 grid-rows-1 w-full p-5 h-full gap-4">
    <div class="col-span-2 h-full bg-secondary rounded-md">
      HERE WILL BE USERS ALBUMS
    </div>
    <div
      class="col-span-1 min-w-40 flex flex-col justify-center items-start p-5 gap-5 bg-secondary rounded-md"
    >
      <NuxtImg
        :src="userData?.image ?? ''"
        class="rounded-full aspect-square mb-6 border-solid border-8 border-textSecondary"
      ></NuxtImg>
      <h1 class="text-5xl bg-textPrimary text-textSecondary p-1">
        {{ userData?.name }}
      </h1>
      <div class="w-full">
        <p class="text-3xl text-white">{{ userData?.description }}</p>
        <p class="text-xl text-white">
          Liked Artworks: {{ userData?.likedArtworks }}
        </p>
        <p class="text-gray mt-10">With us since {{ userData?.createdAt }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
