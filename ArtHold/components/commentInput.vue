<script setup lang="ts">
const props = defineProps({
  onSubmit: {
    type: Function,
    required: true,
  },
});

const comment = ref("");
const handlePostLogic = () => {
  props.onSubmit(comment.value);
  comment.value = "";
};
</script>
<template>
  <div class="w-full flex justify-start items-start gap-1">
    <textarea
      class="bg-textSecondary no-scrollbar resize-none text-black rounded-sm px-4 py-2 w-full h-max placeholder-gray-dark focus:outline-none text-primary focus:text-primary"
      type="text"
      v-model="comment"
      placeholder="Comment..."
      maxlength="200"
    ></textarea>
    <button
      @click="handlePostLogic"
      class="w-12 rounded-sm h-full bg-textSecondary flex items-center justify-center"
    >
      <NuxtImg class="w-full h-full" src="/angle-up-svgrepo-com.svg"></NuxtImg>
    </button>
  </div>
</template>
<style scoped></style>
