import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const session = await getServerSession(event);
  const body = await readBody(event);

  const { artworkID } = body;
  const artworkId = Number(artworkID);
  const userId = session?.user.id;
  try {
    const deletedArtwork = await prisma.artwork.delete({
      where: {
        id: artworkId,
        userID: userId,
      },
    });

    return {
      statusCode: 200,
      body: {
        message: "Artwork deleted",
        artwork: deletedArtwork,
      },
    };
  } catch (error) {
    console.error("Error deleting an artwork:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error, cannot delete",
    });
  }
});
