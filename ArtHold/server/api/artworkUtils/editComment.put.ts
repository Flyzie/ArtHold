import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const session = await getServerSession(event);
  const body = await readBody(event);

  const { commentID, editedComment } = body;
  const commentId = Number(commentID);
  const userId = session?.user.id;
  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
        userId: userId,
      },
      data: { contents: editedComment },
    });

    return {
      statusCode: 200,
      body: {
        message: "Comment edited",
        comment: updatedComment,
      },
    };
  } catch (error) {
    console.error("Error editing a comment:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error, cannot delete",
    });
  }
});
