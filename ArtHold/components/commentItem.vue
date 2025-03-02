<script setup lang="ts">
import type { Comment } from "@prisma/client";
const { data } = useAuth();
const props = defineProps<{
  comment: Comment;
  replies?: Comment[];
}>();

const userId = data.value?.user.id;
const commentID = props.comment.id;
const isModalOpen = ref(false);
const editMode = ref(false);
const replyMode = ref(false);
const commentContent = ref(props.comment.contents);

const assignedReplies = computed(() => {
  if (props.replies)
    return props.replies.filter((reply) => reply.parentId === commentID);
});

const emit = defineEmits(["commentAdded"]);

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
  emit("commentAdded");
};

const handleEdit = async () => {
  const { error } = await useFetch("/api/artworkUtils/editComment", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentID: commentID,
      editedComment: commentContent.value,
    }),
  });
  if (error.value) {
    throw createError({
      statusCode: 400,
      statusMessage: `${error.value.data.message}`,
    });
  }
  editMode.value = false;
  emit("commentAdded");
};

const handlePostReply = async (newComment: string) => {
  const { error } = await useFetch("/api/artworkUtils/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parentID: commentID,
      comment: newComment,
    }),
  });

  if (error.value) {
    throw createError({
      statusCode: 400,
      statusMessage: `${error.value.data.message}`,
    });
  }
  replyMode.value = false;
  emit("commentAdded");
};
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
          @click="editMode = true"
          class="text-textPrimary bg-textSecondary px-0.5 rounded-sm hover:bg-white"
        >
          Edit
        </button>
      </div>
    </div>
    <div class="px-2 py-1">
      <h1 v-if="!editMode" class="text-white text-2xl text-balance">
        {{ comment.contents }}
      </h1>
      <div v-if="editMode">
        <textarea
          class="bg-textSecondary no-scrollbar resize-none text-black rounded-sm px-4 py-2 w-full h-max placeholder-gray-dark focus:outline-none text-primary focus:text-primary"
          v-model="commentContent"
          type="text"
          maxlength="200"
        ></textarea>
        <div class="flex gap-2">
          <button
            @click="handleEdit"
            class="text-textPrimary bg-textSecondary px-0.5 rounded-sm hover:bg-white"
          >
            Confirm
          </button>
          <button
            @click="editMode = false"
            class="text-textPrimary bg-textSecondary px-0.5 rounded-sm hover:bg-white"
          >
            Cancel
          </button>
        </div>
      </div>
      <button
        v-if="!replyMode && !comment.parentId"
        @click="replyMode = true"
        class="text-gray-light rounded-sm"
      >
        Reply
      </button>
      <div
        v-if="replyMode"
        class="flex gap-1 items-start justify-start flex-wrap"
      >
        <CommentInput :onSubmit="handlePostReply"></CommentInput>
        <button
          @click="replyMode = false"
          class="text-textPrimary bg-textSecondary px-0.5 rounded-sm hover:bg-white"
        >
          Cancel
        </button>
      </div>
    </div>
    <div class="pl-8 bg-textSecondary">
      <CommentItem
        v-for="reply in assignedReplies"
        :key="reply.id"
        :comment="reply"
        @commentAdded="emit('commentAdded')"
      />
    </div>
  </div>
  <ActionModal
    @cancel="isModalOpen = false"
    @confirm="handleDelete"
    :isOpen="isModalOpen"
  ></ActionModal>
</template>
<style scoped></style>
