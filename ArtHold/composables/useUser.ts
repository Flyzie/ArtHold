import type { User } from "@prisma/client";

export default async (userID: Number) => {
  const { data, error, refresh } = await useFetch<User>(`/api/user/${userID}`);

  if (error.value) {
    throw createError({ statusCode: 400, statusMessage: "User not found" });
  }

  return data;
};
