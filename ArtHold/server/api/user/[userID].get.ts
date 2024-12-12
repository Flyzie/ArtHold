import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params || !params.userID) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid user ID",
    });
  }
  const { userID } = params;

  const userIdInt = parseInt(userID, 10);
  if (isNaN(userIdInt)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid user ID",
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userIdInt,
      },
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not Found",
      });
    }

    const { password, email, ...userSafeData } = user;

    return userSafeData;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
