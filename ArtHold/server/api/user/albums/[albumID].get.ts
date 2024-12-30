import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params || !params.albumID) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid album ID",
    });
  }

  const { albumID } = params;

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
      assignedArtworks: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
        },
      },
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
