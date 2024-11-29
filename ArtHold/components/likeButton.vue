<script setup lang="ts">
const { data } = useAuth();
const userAlbums = await useUserAlbums(Number(data.value?.user.id));

const props = defineProps({
  artworkID: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

const displayedLikes = ref(props.likes);

const likedArtworksAlbum = userAlbums.value?.find(
  (album) => album.name === "Liked Artworks"
);

const isLiked = ref(
  likedArtworksAlbum?.assignedArtworks.some(
    (artwork) => artwork.id === props.artworkID
  )
);

const buttonText = computed(() => (isLiked.value ? "Unlike" : "Like"));

const likeArtwork = async () => {
  const action = isLiked.value ? "unlike" : "like";
  if (isLiked.value) {
    displayedLikes.value -= 1;
  } else {
    displayedLikes.value += 1;
  }
  isLiked.value = !isLiked.value;
  const { error } = await useFetch(`/api/artworkUtils/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      artworkID: props.artworkID,
      action: action,
    },
  });
  if (error.value) {
    isLiked.value = !isLiked.value;
    displayedLikes.value = props.likes;
    throw createError({
      statusCode: 400,
      statusMessage: `${error.value.data.message}`,
    });
  }
};
</script>

<template>
  <p class="text-xl text-white px-1">Likes: {{ displayedLikes }}</p>
  <button
    @click="likeArtwork"
    class="w-full p-1 bg-textSecondary text-textPrimary rounded-lg hover:bg-textPrimary hover:text-textSecondary"
    :class="{ isLiked: isLiked }"
  >
    {{ buttonText }}
  </button>
</template>

<style scoped>
.isLiked {
  background-color: rgba(123, 125, 100, 0.5);
  color: rgb(226, 236, 147);
}
.isLiked:hover {
  color: rgba(123, 125, 100, 0.5);
  background-color: rgb(226, 236, 147);
}
</style>
