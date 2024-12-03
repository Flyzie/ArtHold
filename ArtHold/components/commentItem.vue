<script setup lang="ts">
import type { Comment, User } from "@prisma/client";
const props = defineProps<{
  comment: Comment;
}>();

const commentOp = await useUser(Number(props.comment.userId));

const profileImage = computed(() => {
  return commentOp.value?.image
    ? commentOp.value?.image
    : "/placeholderProfile.jpg";
});
</script>
<template>
  <div class="mb-4 bg-textPrimary rounded-sm">
    <div class="flex justify-start items-center p-2">
      <NuxtLink :to="{ path: `/${commentOp?.id}` }">
        <NuxtImg
          :src="profileImage"
          fit="cover"
          width="50"
          height="50"
          class="rounded-full min-w-6 aspect-square"
        />
      </NuxtLink>
      <div>
        <h1 class="text-white">{{ commentOp?.name }}</h1>
        <h1 class="text-gray-light">{{ commentOp?.description }}</h1>
      </div>
    </div>
    <div class="px-2 py-1">
      <h1 class="text-white text-2xl text-balance">{{ comment.contents }}</h1>
    </div>
  </div>
</template>
<style scoped></style>
