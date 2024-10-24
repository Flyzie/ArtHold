<script setup>
import { ref, onMounted } from "vue";

const images = ref([]);

const fetchImages = async () => {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=2&limit=16"
    );
    const data = await response.json();
    images.value = data;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};

onMounted(() => {
  fetchImages();
});
</script>

<template>
  <div
    class="w-full h-full text-textPrimary grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-1"
  >
    <div
      v-for="image in images"
      :key="image.id"
      class="bg-orange aspect-square overflow-hidden flex items-center justify-center rounded-md m-0"
    >
      <img
        :src="image.download_url"
        :alt="image.author"
        class="w-full h-full object-cover rounded-md transition-transform duration-300 hover-animate"
      />
    </div>
  </div>
</template>

<style scoped>
.hover-animate {
  @apply hover:scale-110;
}
</style>
