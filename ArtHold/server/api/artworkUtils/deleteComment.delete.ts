import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const session = await getServerSession(event);
  const body = await readBody(event);

  const { commentID } = body;
  const commentId = Number(commentID);
  const userId = session?.user.id;
  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id: commentId,
        userId: userId,
      },
    });

    return {
      statusCode: 200,
      body: {
        message: "Comment deleted",
        comment: deletedComment,
      },
    };
  } catch (error) {
    console.error("Error deleting a comment:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error, cannot delete",
    });
  }
});
