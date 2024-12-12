<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});

const openStatus = defineModel("openStatus", {
  type: Boolean,
  required: true,
});

const closeToast = () => {
  openStatus.value = false;
};
</script>

<template>
  <div
    v-if="openStatus"
    class="w-48 flex items-center justify-center font-bold fixed top-10 right-5 border-2 border-errorRed border-dashed text-errorRed bg-textPrimary p-4 rounded-md z-50 animate-fade-down animate-once animate-duration-200 animate-ease-linear animate-normal"
  >
    {{ props.message }}
    <button
      @click="closeToast()"
      class="bg-errorRed text-textPrimary p-2 rounded-md"
    >
      Ok
    </button>
  </div>
</template>

<style scoped></style>
