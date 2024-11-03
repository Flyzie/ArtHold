import type { User } from "@prisma/client";

export default async (userID: number) => {
  const { data, error } = await useFetch<User>(`/api/user/${userID}`);

  if (error.value) {
    throw createError({ statusCode: 400, statusMessage: "User not found" });
  }

  return data;
};
