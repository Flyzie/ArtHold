import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params || !params.artworkID) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid artwork ID",
    });
  }
  const { artworkID } = params;

  const artworkIdInt = parseInt(artworkID, 10);
  if (isNaN(artworkIdInt)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid user ID",
    });
  }
  try {
    const artwork = await prisma.artwork.findUnique({
      where: {
        id: artworkIdInt,
      },
      include: { assignedComments: true, assignedTags: true },
    });

    if (!artwork) {
      throw createError({
        statusCode: 404,
        statusMessage: "Artwork not Found",
      });
    }

    return artwork;
  } catch (error) {
    console.error("Error fetching artwork:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
