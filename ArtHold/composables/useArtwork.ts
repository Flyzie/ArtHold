import type { Artwork } from "@prisma/client";

export default async (artworkID: Number) => {
  const { data, error } = await useFetch<Artwork>(`/api/artwork/${artworkID}`, {
    lazy: true,
  });

  if (error.value) {
    throw createError({ statusCode: 400, statusMessage: "Artwork not found" });
  }

  return data;
};
