<script setup>
let input = ref("Search for Artworks");
</script>

<template>
  <div>
    <input
      class="bg-textSecondary text-black rounded-lg px-4 py-2 min-w-44 focus:outline-none text-primary focus:text-primary"
      type="text"
      v-model="input"
    />
  </div>
</template>

<style scoped></style>
