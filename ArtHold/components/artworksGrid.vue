<script setup>
import { ref, onMounted } from "vue";

const images = ref([]);

const fetchImages = async () => {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=16"
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
    class="w-full h-full text-textPrimary grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2"
  >
    <div
      v-for="image in images"
      :key="image.id"
      class="bg-orange aspect-square flex items-center justify-center rounded-md m-0"
    >
      <img
        :src="image.download_url"
        :alt="image.author"
        class="w-full h-full object-cover rounded-md"
      />
    </div>
  </div>
</template>
