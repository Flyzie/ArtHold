import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { albumID } = event.context.params;

  if (!albumID) {
    throw createError({
      statusCode: 400,
      statusMessage: "albumID is required",
    });
  }

  const album = await prisma.album.findUnique({
    where: {
      id: Number(albumID),
    },
    include: {
      assignedArtworks: true,
    },
  });

  if (!album) {
    throw createError({
      statusCode: 404,
      statusMessage: "Album not found",
    });
  }

  return album;
});
