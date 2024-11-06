<script setup lang="ts">
import useUser from "~/composables/useUser";
const route = useRoute();

const { status, data } = useAuth();

const userData = await useUser(Number(route.params.userID));

const isUser = computed(() => {
  if (data.value?.user.id === Number(route.params.userID)) {
    return true;
  } else {
    return false;
  }
});

const formattedDate = computed(() => {
  if (userData.value?.createdAt) {
    const date = new Date(userData.value?.createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = date.getDay();
    return `${day}/${month}/${year}`;
  }
  return "";
});
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
        fit="cover"
        width="500"
        height="500"
        class="rounded-full aspect-square mb-6 border-solid border-8 border-textSecondary"
      ></NuxtImg>
      <div class="flex items-start justify-center gap-5 flex-wrap">
        <h1 class="text-5xl bg-textPrimary text-textSecondary p-1">
          {{ userData?.name }}
        </h1>
        <NuxtLink
          v-if="isUser"
          :to="{ path: '/profileEdit' }"
          class="p-1 bg-textSecondary text-textPrimary rounded-lg hover:bg-textPrimary hover:text-textSecondary"
          >Edit Profile</NuxtLink
        >
      </div>
      <div class="w-full">
        <p class="text-3xl text-white">{{ userData?.description }}</p>
        <p class="text-xl text-white">
          Liked Artworks: {{ userData?.likedArtworks }}
        </p>
        <p class="text-gray mt-10">With us since {{ formattedDate }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
