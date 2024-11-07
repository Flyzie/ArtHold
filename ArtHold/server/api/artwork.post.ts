// ArtHold/server/api/register.post.ts
import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const form = formidable({
    multiples: false,
    uploadDir: "./public/img/artworks/",
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

  const { userId, title, description } = fields;
  const artworkImage = files.image ? files.image.newFilename : null;

  const userID = Number(userId);

  if (!title || !description || !artworkImage) {
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

  const artworkData: any = { title, description };
  if (artworkImage) {
    artworkData.artworkImage = `/img/artworks/${artworkImage}`;
  }

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
