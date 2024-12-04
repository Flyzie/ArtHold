<script setup lang="ts">
import type { Comment, User } from "@prisma/client";
const { data } = useAuth();
const props = defineProps<{
  comment: Comment;
}>();

const userId = data.value?.user.id;
const commentID = props.comment.id;
const isModalOpen = ref(false);

const isOp = computed(() => {
  if (userId === props.comment.userId) {
    return true;
  } else {
    return false;
  }
});

const commentOp = await useUser(Number(props.comment.userId));

const profileImage = computed(() => {
  return commentOp.value?.image
    ? commentOp.value?.image
    : "/placeholderProfile.jpg";
});

const handleDelete = async () => {
  const { error } = await useFetch("/api/artworkUtils/deleteComment", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentID: commentID,
    }),
  });
  if (error.value) {
    throw createError({
      statusCode: 400,
      statusMessage: `${error.value.data.message}`,
    });
  }
  isModalOpen.value = false;
};
const handleEdit = async () => {};
</script>
<template>
  <div class="mb-4 bg-textPrimary rounded-sm">
    <div class="flex justify-between items-center p-2">
      <div class="flex justify-start items-center">
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
      <div class="flex flex-col items-end justify-center gap-1" v-if="isOp">
        <button
          @click="isModalOpen = !isModalOpen"
          class="text-textPrimary bg-textSecondary px-0.5 rounded-sm hover:bg-white"
        >
          Delete
        </button>
        <button
          class="text-textPrimary bg-textSecondary px-0.5 rounded-sm hover:bg-white"
        >
          Edit
        </button>
      </div>
    </div>
    <div class="px-2 py-1">
      <h1 class="text-white text-2xl text-balance">{{ comment.contents }}</h1>
      <button class="text-gray-light rounded-sm">Reply</button>
    </div>
  </div>
  <ActionModal
    @cancel="isModalOpen = false"
    @confirm="handleDelete"
    :isOpen="isModalOpen"
  ></ActionModal>
</template>
<style scoped></style>
