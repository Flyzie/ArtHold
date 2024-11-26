import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { q, tags, page, limit } = query;

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const skipSize = (pageNum - 1) * limitNum;
  const takeSize = limitNum;

  try {
    const artworks = await prisma.artwork.findMany({
      skip: skipSize,
      take: takeSize,
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

    const artworksCount = await prisma.artwork.count({
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
