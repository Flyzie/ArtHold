import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { artworkID } = query;

  if (!artworkID) {
    throw createError({
      statusCode: 400,
      statusMessage: "artworkID is required",
    });
  }

  try {
    const artwork = await prisma.artwork.update({
      where: {
        id: Number(artworkID),
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    if (!artwork) {
      throw createError({
        statusCode: 404,
        statusMessage: "Artwork not found",
      });
    }

    return {
      statusCode: 200,
      body: {
        message: "Artwork liked",
        artwork: artwork,
      },
    };
  } catch (error) {
    console.error("Error liking artwork:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
