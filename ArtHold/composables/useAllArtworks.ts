import type { Artwork } from "@prisma/client";

export default async () => {
  const { data, error } = await useFetch<Artwork>(`/api/artworks`, {
    lazy: true,
  });

  if (error.value) {
    throw createError({
      statusCode: 400,
      statusMessage: "Artworks not found",
    });
  }

  return data;
};
