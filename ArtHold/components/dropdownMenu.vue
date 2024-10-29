<script setup>
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <button
    :class="{ 'rotate-90': isOpen, 'transition-transform': true }"
    class="w-12 aspect-square"
    @click="toggleDropdown"
    type="button"
    aria-expanded="true"
  >
    <NuxtImg
      src="/align-justify-svgrepo-com.svg"
      class="w-full aspect-square fill-textSecondary"
      alt="sidebar"
    />
  </button>

  <div
    v-if="isOpen"
    class="origin-top-left z-10 absolute top-14 mt-2 w-56 rounded-sm shadow-md bg-textSecondary focus:outline-none animate-fade-down animate-once animate-duration-100 animate-ease-linear animate-normal"
  >
    <slot name="dropdown"></slot>
    <div
      class="p-2 gap-8 flex justify-start items-center hover:bg-primary hover:text-textSecondary"
    >
      <NuxtImg
        src="/upload-window-svgrepo-black-com.svg"
        alt="Upload"
        class="w-6 h-max"
      />
      <NuxtLink :to="{ path: '/' }">Upload</NuxtLink>
    </div>
    <div
      class="p-2 gap-8 flex justify-start items-center hover:bg-primary hover:text-textSecondary"
    >
      <NuxtImg
        src="/notification-bing-svgrepo-black-com.svg"
        alt="notifications"
        class="w-6 h-max"
      />
      <NuxtLink :to="{ path: '/' }">Notifications</NuxtLink>
    </div>
    <div
      class="p-2 gap-8 flex justify-start items-center hover:bg-primary hover:text-textSecondary"
    >
      <NuxtImg
        src="/service-contract-svgrepo-com.svg"
        alt="terms"
        class="w-6 h-max"
      />
      <NuxtLink :to="{ path: '/' }">Terms Of Service</NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
