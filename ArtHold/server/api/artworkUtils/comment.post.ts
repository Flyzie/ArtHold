import { PrismaClient, Comment } from "@prisma/client";
import { getServerSession } from "#auth";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const body = await readBody(event);
  const session = await getServerSession(event);

  const { artworkID, comment, parentID } = body;

  const userID = Number(session?.user.id);
  const artworkId = Number(artworkID);
  const parentId = Number(parentID);

  if (!comment) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cannot post an empty comment",
    });
  }

  const commentData: any = {
    contents: comment,
    userId: userID,
  };

  if (parentId) {
    const parentComment = await prisma.comment.findUnique({
      where: {
        id: parentId,
      },
    });

    if (parentComment?.parentId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Cannot reply to a reply",
      });
    }

    commentData.parentId = parentId;
    commentData.artworkId = parentComment?.artworkId;
  } else {
    commentData.artworkId = artworkId;
  }

  if (!commentData.artworkId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cannot post a comment into the void",
    });
  }

  const newComment = await prisma.comment.create({
    data: {
      ...commentData,
    },
    include: {
      user: true,
      replies: true,
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
