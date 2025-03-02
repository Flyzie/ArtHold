<script setup lang="ts">
import type { ArtworkWithUser } from "~/composables/useArtwork";
import { ref, onMounted } from "vue";

const props = defineProps<{
  artworks: ArtworkWithUser[];
}>();

const emit = defineEmits(["intersected"]);

const hoveredImageId = ref(null);
const intersectionDiv = ref(null);

const toggleHovered = (id: any) => {
  hoveredImageId.value = id;
};

const clearHovered = () => {
  hoveredImageId.value = null;
};

const observerTriggered = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting) {
    console.log("Observer Triggered");
    emit("intersected");
  }
};

onMounted(() => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver(observerTriggered, options);
  watch(intersectionDiv, (newVal) => {
    if (newVal) {
      observer.observe(newVal);
    }
  });
});
</script>

<template>
  <div
    class="w-full h-full text-textPrimary grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-1"
  >
    <div
      v-for="artwork in props.artworks"
      @mouseenter="toggleHovered(artwork?.id)"
      @mouseleave="clearHovered"
      :key="artwork?.id"
      class="aspect-square overflow-hidden flex items-center justify-center rounded-md m-0 relative"
    >
      <div
        class="absolute origin-bottom-left bottom-0 p-2 left-0 bg-opacity-85 backdrop-blur-xl text-white animate-fade animate-once animate-duration-300 animate-ease-linear z-10 animate-normal"
        v-if="hoveredImageId === artwork?.id"
      >
        <h1 class="w-full text-wrap">{{ artwork?.title }}</h1>
        <h2 class="w-full text-wrap">{{ artwork?.user.name.toUpperCase() }}</h2>
      </div>
      <a :href="'/artwork/' + artwork?.id">
        <NuxtImg
          width="500"
          height="500"
          :src="artwork.artworkImage"
          :alt="artwork.description"
          class="w-full h-full object-cover rounded-md transition-transform duration-300 hover-animate"
        ></NuxtImg>
      </a>
    </div>
    <div
      v-if="artworks.length"
      ref="intersectionDiv"
      class="bg-orange invisible aspect-square overflow-hidden flex items-center justify-center rounded-md m-0 relative"
    >
      intersection observer
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
