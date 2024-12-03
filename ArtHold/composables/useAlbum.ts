import type { Album, Artwork, User } from "@prisma/client";

interface ArtworkWithUser extends Artwork {
  user: User;
}

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
