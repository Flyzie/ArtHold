// ArtHold/server/api/register.post.ts
import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const form = formidable({
    multiples: false,
    uploadDir: "./public/img/profilePics/",
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

  const { id, name, description } = fields;
  const image = files.image ? files.image.newFilename : null;

  const userId = Number(id);

  if (!name || !description) {
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

  const updateData: any = { name, description };
  if (image) {
    updateData.image = `/img/profilePics/${image}`;
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "User does not exists",
    });
  }

  if (existingUser.image) {
    fs.unlink(`public/${existingUser.image}`, (err) => {
      if (err) {
        console.log("Unable to delete existing image or it doesnt exist", err);
      } else {
        console.log(`deleting file: /img/profilePics/${existingUser.image}`);
      }
    });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return {
      statusCode: 200,
      body: {
        message: "User updated successfully",
        user: updatedUser,
      },
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
