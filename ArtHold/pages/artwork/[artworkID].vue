<script setup lang="ts">
import useUser from "~/composables/useUser";
import { useArtwork } from "~/composables/useArtwork";

const route = useRoute();
const router = useRouter();

const { data, status } = useAuth();

const { data: artwork, refresh } = await useArtwork(
  Number(route.params.artworkID),
  true
);

const userData = await useUser(Number(artwork.value?.userID));
const loggedIn = computed(() => status.value === "authenticated");
const comments = computed(() => artwork.value?.assignedComments ?? []);
const artworkID = artwork.value?.id;
const isModalOpen = ref(false);

const isUser = computed(() => {
  if (data.value?.user.id === Number(artwork.value?.userID)) {
    return true;
  } else {
    return false;
  }
});

const handleDelete = async () => {
  const { error } = await useFetch("/api/artworkUtils/deleteArtwork", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      artworkID: artworkID,
    }),
  });
  if (error.value) {
    throw createError({
      statusCode: 400,
      statusMessage: `${error.value.data.message}`,
    });
  }
  isModalOpen.value = false;
  router.push(`/`);
};

const reloadComments = async () => {
  await refresh();
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
        <NuxtLink :to="{ path: `/${userData?.id}` }">
          <NuxtImg
            :src="userData?.image ?? ''"
            fit="cover"
            width="200"
            height="200"
            class="rounded-full aspect-square mb-6 border-solid border-8 border-textSecondary"
          ></NuxtImg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl bg-textPrimary text-textSecondary p-1">
            {{ userData?.name }}
          </h1>
          <p class="text-2xl text-white p-1">{{ userData?.description }}</p>
        </div>
      </div>
      <div class="flex flex-wrap items-start justify-start gap-3">
        <h1 class="text-8xl bg-textPrimary text-textSecondary p-1 text-wrap">
          {{ artwork?.title }}
        </h1>
        <NuxtLink
          v-if="isUser"
          :to="{
            name: 'projects-newArtwork',
            query: { artworkId: `${artwork?.id}` },
          }"
          class="p-1 bg-textSecondary text-textPrimary rounded-lg hover:bg-textPrimary hover:text-textSecondary"
          >Edit Artwork</NuxtLink
        >
        <DeleteButton
          v-if="isUser"
          @click="isModalOpen = !isModalOpen"
          text="Delete Artwork"
        ></DeleteButton>
      </div>
      <div class="w-full">
        <p class="text-3xl text-white px-1">{{ artwork?.description }}</p>
        <p v-if="!loggedIn" class="text-xl text-white px-1">
          Likes: {{ artwork?.likes }}
        </p>
        <LikeButton
          v-if="loggedIn && artwork"
          :artworkID="artwork?.id"
          :likes="artwork?.likes"
        ></LikeButton>
        <p class="text-gray mt-10">Posted:</p>
      </div>
      <CommentDisplay
        @commentAdded="reloadComments"
        :comments="comments"
      ></CommentDisplay>
    </div>
  </div>
  <ActionModal
    @cancel="isModalOpen = false"
    @confirm="handleDelete"
    :isOpen="isModalOpen"
  ></ActionModal>
</template>

<style scoped></style>
