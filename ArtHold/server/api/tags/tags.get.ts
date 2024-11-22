import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const tags = await prisma.tag.findMany();

    if (!tags) {
      throw createError({
        statusCode: 404,
        statusMessage: "Tags not found in db",
      });
    }

    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
