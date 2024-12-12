<script setup lang="ts">
import { useRoute } from "vue-router";
import type { CommentWithReplies } from "~/composables/useArtwork";

const { status } = useAuth();
const route = useRoute();

const props = defineProps<{
  comments: CommentWithReplies[];
}>();

const originalComments = computed(() => {
  return props.comments.filter((comment) => comment.parentId === null);
});

const replies = computed(() => {
  return props.comments.filter((comment) => comment.parentId !== null);
});

const loggedIn = computed(() => status.value === "authenticated");
const artworkID = Number(route.params.artworkID);

const emit = defineEmits(["commentAdded"]);

const handlePostComment = async (newComment: string) => {
  const { error } = await useFetch("/api/artworkUtils/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      artworkID: artworkID,
      comment: newComment,
    }),
  });

  if (error.value) {
    throw createError({
      statusCode: 400,
      statusMessage: `${error.value.data.message}`,
    });
  }
  emit("commentAdded");
};

const emitRefreshComponent = () => {
  emit("commentAdded");
};
</script>
<template>
  <div class="w-full">
    <h1 class="text-white">Comments:</h1>
    <div class="w-full rounded-md">
      <CommentItem
        v-for="comment in originalComments"
        :comment="comment"
        :replies="replies"
        :key="comment.id"
        @commentAdded="emitRefreshComponent"
      ></CommentItem>
    </div>
    <div v-if="loggedIn">
      <CommentInput :onSubmit="handlePostComment" />
    </div>
  </div>
</template>
<style scoped></style>
