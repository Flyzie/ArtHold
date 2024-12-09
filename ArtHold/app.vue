<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";
import Toast from "~/components/toast.vue";

const showErrorToast = ref(false);
const errorMessage = ref("");

onErrorCaptured((err) => {
  errorMessage.value = String(err);
  showErrorToast.value = true;
});
</script>

<template>
  <div>
    <Toast :message="errorMessage" v-model:openStatus="showErrorToast" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
