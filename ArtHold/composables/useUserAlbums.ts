import type { Album } from "@prisma/client";

export default async (userID: Number) => {
  const { data, error } = await useFetch<Album[]>(`/api/albums/${userID}`);

  if (error.value) {
    throw createError({ statusCode: 400, statusMessage: "Albums not found" });
  }

  return data;
};
