<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["confirm", "cancel"]);
const handleConfirm = () => {
  emit("confirm");
};

const handleCancel = () => {
  emit("cancel");
};
</script>
<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-textPrimary opacity-50"></div>
    <div
      class="bg-textSecondary rounded-sm p-6 md:p-14 flex flex-col items-center justify-center z-10 gap-5 max-w-md w-full mx-4"
    >
      <h1 class="text-textPrimary md:text-4xl">
        are you sure you want to perform this action?
      </h1>
      <div class="flex gap-3">
        <button
          @click="handleConfirm"
          class="text-textSecondary bg-primary hover:text-textPrimary hover:bg-textSecondary p-2 md:p-5 text-2xl rounded-sm"
        >
          Confirm
        </button>
        <button
          @click="handleCancel"
          class="text-textPrimary bg-textSecondary hover:text-textSecondary hover:bg-primary p-2 md:p-5 text-2xl rounded-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
