<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";
import Toast from "~/components/toast.vue";

const showErrorToast = ref(false);
const errorMessage = ref("");

onErrorCaptured((err, instance, info) => {
  errorMessage.value = String(err);
  showErrorToast.value = true;
});
</script>

<template>
  <div>
    <Toast
      v-if="showErrorToast"
      :message="errorMessage"
      v-model:openStatus="showErrorToast"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
