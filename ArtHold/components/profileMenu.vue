<script setup>
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <button
    class="bg-textSecondary rounded-full min-w-10 aspect-square"
    @click="toggleDropdown"
    type="button"
    aria-expanded="true"
  ></button>

  <div
    v-if="isOpen"
    class="z-10 absolute right-6 top-14 origin-bottom-left mt-2 w-52 rounded-sm shadow-md bg-textSecondary focus:outline-none animate-fade-down animate-once animate-duration-100 animate-ease-linear animate-normal"
  >
    <div
      class="p-2 gap-8 flex justify-start items-center hover:bg-primary hover:text-textSecondary"
    >
      <NuxtImg
        src="/upload-window-svgrepo-black-com.svg"
        alt="Upload"
        class="w-6 h-max"
      />
      <NuxtLink :to="{ path: '/' }">My Profile</NuxtLink>
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
