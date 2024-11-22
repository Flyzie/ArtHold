// ArtHold/server/api/register.post.ts
import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const uploadDir = path.join(process.cwd(), "/public/img/artworks");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const form = formidable({
    multiples: false,
    uploadDir: uploadDir,
    keepExtensions: true,
  });

  const { fields, files } = await new Promise<{ fields: any; files: any }>(
    (resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) {
          reject(err);
        }
        resolve({ fields, files });
      });
    }
  );

  const { userId, title, description, albumId, tags } = fields;
  const artworkImage = files.image ? files.image.newFilename : null;

  const userID = Number(userId);
  const albumID = Number(albumId);
  const tagIDs = tags ? JSON.parse(tags) : [];

  if (!title || !description || !artworkImage || !albumID) {
    throw createError({
      statusCode: 400,
      statusMessage: "You cant leave fields empty",
    });
  }

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "You have to be authorized",
    });
  }

  const artworkData: any = {
    title,
    description,
    artworkImage: `/img/artworks/${artworkImage}`,
  };

  const existingUser = await prisma.user.findUnique({
    where: { id: userID },
  });

  try {
    const artwork = await prisma.artwork.create({
      data: {
        ...artworkData,
        user: {
          connect: { id: existingUser?.id },
        },
        album: {
          connect: { id: albumID },
        },
        assignedTags: {
          connect: tagIDs.map((tagId: number) => ({ id: tagId })),
        },
      },
    });

    return {
      statusCode: 200,
      body: {
        message: "Artwork created successfully",
        artwork: artwork,
      },
    };
  } catch (error) {
    console.error("Error creating artwork:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
