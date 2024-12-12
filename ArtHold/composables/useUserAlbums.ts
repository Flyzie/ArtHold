import type { Album, Artwork } from "@prisma/client";

export interface AlbumWithArtworks extends Album {
  assignedArtworks: Artwork[];
}

export default async (userID: Number) => {
  const { data, error } = await useFetch<AlbumWithArtworks[]>(
    `/api/albums/${userID}`
  );

  if (error.value) {
    throw createError({ statusCode: 400, statusMessage: "Albums not found" });
  }

  return data;
};
