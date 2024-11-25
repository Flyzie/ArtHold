import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { q, tags } = query;

  try {
    const artworks = await prisma.artwork.findMany({
      where: {
        AND: [
          { title: { contains: q as string, mode: "insensitive" } },
          tags
            ? {
                assignedTags: {
                  some: {
                    name: tags as string,
                  },
                },
              }
            : {},
        ],
      },
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
