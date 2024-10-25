<script setup>
import { ref, onMounted } from "vue";

const images = ref([]);

const hoveredImageId = ref(null);

const fetchImages = async () => {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=2&limit=16"
    );
    const data = await response.json();
    console.log(data);
    images.value = data;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};

const toggleHovered = (id) => {
  hoveredImageId.value = id;
};

const clearHovered = () => {
  hoveredImageId.value = null;
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
      @mouseenter="toggleHovered(image.id)"
      @mouseleave="clearHovered"
      :key="image.id"
      class="bg-orange aspect-square overflow-hidden flex items-center justify-center rounded-md m-0 relative"
    >
      <div
        class="absolute origin-bottom-left bottom-0 p-2 left-0 bg-opacity-85 backdrop-blur-xl text-white animate-fade animate-once animate-duration-300 animate-ease-linear z-10 animate-normal"
        v-if="hoveredImageId === image.id"
      >
        <h1 class="w-full text-wrap">Placeholder Title</h1>
        <h2 class="w-full text-wrap">{{ image.author }}</h2>
      </div>
      <img
        :src="image.download_url"
        :alt="image.author"
        class="w-full h-full object-cover rounded-md transition-transform duration-300 hover-animate"
      />
    </div>
    <div
      v-for="image in images"
      @mouseenter="toggleHovered(image.id)"
      @mouseleave="clearHovered"
      :key="image.id"
      class="bg-orange aspect-square overflow-hidden flex items-center justify-center rounded-md m-0 relative"
    >
      <div
        class="absolute origin-bottom-left bottom-0 p-2 left-0 bg-opacity-85 backdrop-blur-xl text-white animate-fade animate-once animate-duration-300 animate-ease-linear z-10 animate-normal"
        v-if="hoveredImageId === image.id"
      >
        <h1 class="w-full text-wrap">Placeholder Title</h1>
        <h2 class="w-full text-wrap">{{ image.author }}</h2>
      </div>
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
.backdrop-blur-xl {
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-top-right-radius: 5px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
}
</style>
