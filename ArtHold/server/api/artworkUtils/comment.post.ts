import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const body = await readBody(event);
  const session = await getServerSession(event);

  const { artworkID, comment } = body;

  const userID = session?.user.id;
  const artworkId = Number(artworkID);

  if (!comment) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cannot post an empty comment",
    });
  }

  if (!artworkID) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cannot post a comment into the void",
    });
  }

  const newComment = await prisma.comment.create({
    data: {
      contents: comment,
      artworkId,
      userId: userID,
    },
    include: {
      user: true,
    },
  });

  try {
    return {
      statusCode: 200,
      body: {
        message: "Comment posted",
        comment: newComment,
      },
    };
  } catch (error) {
    console.error("Error posting a comment:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error, cannot comment",
    });
  }
});
