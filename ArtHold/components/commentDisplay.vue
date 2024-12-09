<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Comment, User } from "@prisma/client";
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

// event names should be more descriptive and make sense inside of this component
// (without assumption of what it will do in parent component)
// E.g. better name would be "commentAdded", "commentSubmitted", "". Same for CommentItem component.
const emit = defineEmits(["refreshComponent"]);

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
  emit("refreshComponent");
};

const emitRefreshComponent = () => {
  emit("refreshComponent");
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
        @refreshComments="emitRefreshComponent"
      ></CommentItem>
    </div>
    <div v-if="loggedIn">
      <CommentInput :onSubmit="handlePostComment" />
    </div>
  </div>
</template>
<style scoped></style>
