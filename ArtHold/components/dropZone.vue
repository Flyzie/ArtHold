<script setup lang="ts">
const active = ref(false);

const props = defineProps({
  text: {
    type: String,
    default: "Drag and drop your artwork here",
  },
});

const toggleActive = () => {
  active.value = !active.value;
};
</script>
<template>
  <div
    class="w-full h-40 bg-textPrimary border-2 border-dashed border-textSecondary opacity-75"
    @drop.prevent="toggleActive"
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    :class="{ activeDropzone: active }"
  >
    <div class="w-full h-full flex items-center justify-center gap-4">
      <NuxtImg src="/upload-svgrepo-com.svg" alt="Upload" class="w-6 h-max" />
      <label for="fileInput" class="text-textSecondary">{{ props.text }}</label>
      <NuxtImg src="/upload-svgrepo-com.svg" alt="Upload" class="w-6 h-max" />
      <input
        class="hidden"
        id="fileInput"
        name="fileInput"
        type="file"
        accept=".jpg, .png"
      />
    </div>
  </div>
</template>
<style scoped>
.activeDropzone {
  background-color: rgb(237 244 135);
  border-color: black;
}
</style>
