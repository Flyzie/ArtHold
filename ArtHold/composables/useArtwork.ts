import type { Artwork, Comment, User } from "@prisma/client";

export interface CommentWithReplies extends Comment {
  replies: Comment[];
}

export interface ArtworkWithComments extends Artwork {
  assignedComments: CommentWithReplies[];
}

export interface ArtworkWithUser extends Artwork {
  user: User;
}

export async function useArtwork(artworkID: Number, isImmediate: boolean) {
  const { data, error, refresh, execute } = await useFetch<ArtworkWithComments>(
    `/api/artwork/${artworkID}`,
    {
      lazy: true,
      immediate: isImmediate,
    }
  );

  if (error.value) {
    throw createError({ statusCode: 400, statusMessage: "Artwork not found" });
  }

  return { data, refresh, execute };
}
