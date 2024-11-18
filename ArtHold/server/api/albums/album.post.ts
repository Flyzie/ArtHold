// ArtHold/server/api/register.post.ts
import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const form = formidable({
    multiples: false,
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

  const { name, userId } = fields;

  const userID = Number(userId);

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Album must have a name",
    });
  }

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "You have to be authorized",
    });
  }

  const albumData: any = {
    name,
    userID,
  };

  try {
    const album = await prisma.album.create({
      data: albumData,
    });

    return {
      statusCode: 200,
      body: {
        message: "Album created successfully",
        artwork: album,
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
