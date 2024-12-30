<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: "Delete",
  },
});
</script>
<template>
  <button
    class="p-1 bg-errorRed text-textPrimary rounded-lg hover:bg-textPrimary hover:text-textSecondary"
  >
    {{ props.text }}
  </button>
</template>
<style scoped></style>
