<script setup lang="ts">
import useUser from "~/composables/useUser";
import useArtwork from "~/composables/useArtwork";
const route = useRoute();

const { data, status } = useAuth();

let artwork = await useArtwork(Number(route.params.artworkID));
const userData = await useUser(Number(artwork.value?.userID));
const loggedIn = computed(() => status.value === "authenticated");
const comments = computed(() => artwork.value?.assignedComments ?? []);
const compKey = ref(0);

const isUser = computed(() => {
  if (data.value?.user.id === Number(artwork.value?.userID)) {
    return true;
  } else {
    return false;
  }
});

const refreshing = ref(false);
const refreshAll = async () => {
  refreshing.value = true;
  try {
    await refreshNuxtData();
  } finally {
    refreshing.value = false;
  }
};

const reloadPage = async () => {
  //window.location.reload();
  artwork = await useArtwork(Number(route.params.artworkID));
  compKey.value += 1;
};
</script>

<template>
  <div class="grid grid-cols-3 auto-rows-auto w-full p-5 gap-4">
    <div class="md:col-span-2 col-span-3 rounded-md">
      <NuxtImg
        :src="artwork?.artworkImage"
        class="w-full object-contain rounded-md"
      ></NuxtImg>
    </div>
    <div
      class="md:col-span-1 col-span-3 flex flex-col justify-start items-start p-5 gap-5 bg-secondary rounded-md"
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
      <div class="w-full">
        <p class="text-3xl text-white px-1">{{ artwork?.description }}</p>
        <p v-if="!loggedIn" class="text-xl text-white px-1">
          Likes: {{ artwork?.likes }}
        </p>
        <LikeButton
          v-if="loggedIn"
          :artworkID="artwork?.id"
          :likes="artwork?.likes"
        ></LikeButton>
        <p class="text-gray mt-10">Posted:</p>
      </div>
      <CommentDisplay
        @refreshComponent="reloadPage"
        :key="compKey"
        :comments="comments"
      ></CommentDisplay>
    </div>
  </div>
</template>

<style scoped></style>
