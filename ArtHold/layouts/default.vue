<script setup>
import { ref } from "vue";
/*
const getLogo = computed(() => {
  return "assets/img/logo.png";
});

const logo = ref(getLogo);
*/
</script>

<template>
  <div
    class="bg-primary w-full h-full min-h-screen flex flex-col items-center p-0 m-0"
  >
    <div class="w-full h-20 bg-secondary flex justify-center items-center">
      <img
        src="D:\Praca\Project\ArtHold\assets\img\logo.png"
        alt="site logo"
        class="w-12 h-max"
      />
    </div>

    <slot />
  </div>
</template>
