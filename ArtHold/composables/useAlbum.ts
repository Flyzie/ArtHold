import type { Album, Artwork } from "@prisma/client";

interface AlbumWithArtworks extends Album {
  assignedArtworks: Artwork[];
}

export default async (albumID: Number) => {
  const { data, error } = await useFetch<AlbumWithArtworks>(
    `/api/user/albums/${albumID}`
  );

  if (error.value) {
    throw createError({ statusCode: 400, statusMessage: "Album not found" });
  }

  return data;
};
