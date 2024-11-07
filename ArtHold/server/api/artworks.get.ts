import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const artworks = await prisma.artwork.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!artworks) {
      throw createError({
        statusCode: 404,
        statusMessage: "Artworks not found in db",
      });
    }

    return artworks;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
