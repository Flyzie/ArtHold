<script setup lang="ts">
const props = defineProps({
  artworkID: {
    type: Number,
    required: true,
  },
});

const likeArtwork = async () => {
  const { data } = await useFetch(`/api/artworkUtils/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      artworkID: props.artworkID,
    },
  });
};
</script>

<template>
  <button
    @click="likeArtwork"
    class="w-full p-1 bg-textSecondary text-textPrimary rounded-lg hover:bg-textPrimary hover:text-textSecondary"
  >
    Like
  </button>
</template>

<style scoped></style>
