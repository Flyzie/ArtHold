// ArtHold/server/api/register.post.ts
import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const uploadDir = path.join(process.cwd(), "/public/img/profilePics");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

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
    const imagePath = existingUser.image;
    try {
      fs.unlinkSync(imagePath);
      console.log(`Deleted file: ${imagePath}`);
    } catch (err) {
      console.log("Unable to delete existing image or it doesn't exist", err);
    }
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
