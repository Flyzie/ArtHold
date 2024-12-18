import type { Artwork, Comment, User } from "@prisma/client";

export interface CommentWithReplies extends Comment {
  replies: Comment[];
}

interface ArtworkWithComments extends Artwork {
  assignedComments: CommentWithReplies[];
}

export interface ArtworkWithUser extends Artwork {
  user: User;
}

export async function useArtwork(artworkID: Number) {
  const { data, error, refresh } = await useFetch<ArtworkWithComments>(
    `/api/artwork/${artworkID}`,
    {
      lazy: true,
    }
  );

  if (error.value) {
    throw createError({ statusCode: 400, statusMessage: "Artwork not found" });
  }

  return { data, refresh };
}
