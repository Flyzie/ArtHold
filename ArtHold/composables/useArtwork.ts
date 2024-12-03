import type { Artwork, Comment, User } from "@prisma/client";

interface ArtworkWithComments extends Artwork {
  assignedComments: Comment[];
}

export default async (artworkID: Number) => {
  const { data, error } = await useFetch<ArtworkWithComments>(
    `/api/artwork/${artworkID}`,
    {
      lazy: true,
    }
  );

  if (error.value) {
    throw createError({ statusCode: 400, statusMessage: "Artwork not found" });
  }

  return data;
};
