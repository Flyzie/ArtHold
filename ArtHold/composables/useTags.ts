import type { Tag } from "@prisma/client";

export default async () => {
  const { data, error } = await useFetch<Tag[]>(`/api/tags/tags`);

  if (error.value) {
    throw createError({
      statusCode: 400,
      statusMessage: "Tags not found",
    });
  }

  return data;
};
