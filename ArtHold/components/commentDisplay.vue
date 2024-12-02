<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();

const comment = ref("");
const artworkID = Number(route.params.artworkID);

const handlePostComment = async () => {
  const { error } = await useFetch("/api/artworkUtils/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      artworkID: artworkID,
      comment: comment.value,
    }),
  });

  if (error.value) {
    throw createError({
      statusCode: 400,
      statusMessage: `${error.value.data.message}`,
    });
  }
};
</script>
<template>
  <div class="w-full">
    <h1 class="text-white">Comments:</h1>
    <div class="w-full bg-textPrimary"></div>
    <div class="w-full flex justify-start items-start gap-1">
      <textarea
        class="bg-textSecondary no-scrollbar resize-none text-black rounded-sm px-4 py-2 w-full h-max placeholder-gray-dark focus:outline-none text-primary focus:text-primary"
        v-model="comment"
        type="text"
        placeholder="Comment..."
        maxlength="200"
      ></textarea>
      <button
        @click="handlePostComment"
        class="w-12 rounded-sm h-full bg-textSecondary flex items-center justify-center"
      >
        <NuxtImg
          class="w-full h-full"
          src="/angle-up-svgrepo-com.svg"
        ></NuxtImg>
      </button>
    </div>
  </div>
</template>
<style scoped></style>
