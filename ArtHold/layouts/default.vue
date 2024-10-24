<script setup>
import { ref } from "vue";
import ProfileMenu from "~/components/profileMenu.vue";
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
    <header
      class="w-full h-20 bg-gradient-to-b from-secondary to-primary flex justify-between items-center px-6 sticky top-0"
    >
      <DropdownMenu></DropdownMenu>
      <NuxtLink
        :to="{ path: '/' }"
        class="absolute left-1/2 transform -translate-x-1/2"
      >
        <NuxtImg src="/logo.png" alt="site logo" class="w-12 h-max" />
      </NuxtLink>
      <ProfileMenu></ProfileMenu>
    </header>

    <slot />
  </div>
</template>
