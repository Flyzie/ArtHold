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

  if (!userID) {
    throw createError({
      statusCode: 400,
      statusMessage: "userID is required",
    });
  }

  const albums = await prisma.album.findMany({
    where: {
      userID: Number(userID),
    },
    include: {
      assignedArtworks: true,
    },
  });

  return albums;
});
