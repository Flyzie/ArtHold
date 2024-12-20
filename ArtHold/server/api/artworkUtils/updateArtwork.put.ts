// ArtHold/server/api/register.post.ts
import { Artwork, PrismaClient } from "@prisma/client";
import formidable from "formidable";
import { getServerSession } from "#auth";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const uploadDir = path.join(process.cwd(), "/public/img/artworks");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

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

  const { title, description, albumId } = fields;
  const query = getQuery(event);
  const { artworkId } = query;
  const artworkImage = files.image ? files.image.newFilename : null;

  const userID = session?.user.id;
  const albumID = Number(albumId);
  const artworkID = Number(artworkId);

  if (!userID) {
    throw createError({
      statusCode: 400,
      statusMessage: "You have to be authorized",
    });
  }

  if (!title || !description) {
    throw createError({
      statusCode: 400,
      statusMessage: "You cant leave fields empty",
    });
  }

  const existingArtwork = await prisma.artwork.findUnique({
    where: { id: artworkID },
  });

  if (existingArtwork.userID !== userID) {
    throw createError({
      statusCode: 400,
      statusMessage: "You are not an author of this artwork",
    });
  }

  const updateData: Pick<
    Artwork,
    "title" | "description" | "albumID" | "artworkImage"
  > = {
    title,
    description,
    albumID,
    artworkImage: existingArtwork?.artworkImage || "",
  };

  if (existingArtwork.artworkImage && artworkImage) {
    const imagePath = existingArtwork.artworkImage;
    try {
      updateData.artworkImage = `/img/artworks/${artworkImage}`;
      const deleteDir = path.join(process.cwd(), "public", imagePath);
      fs.unlinkSync(deleteDir);
      console.log(`Deleted file: ${deleteDir}`);
    } catch (err) {
      console.log("Unable to delete existing image or it doesn't exist", err);
    }
  } else if (artworkImage) {
    updateData.artworkImage = `/img/artworks/${artworkImage}`;
  }

  const updatedArtwork = await prisma.artwork.update({
    where: {
      id: artworkID,
    },
    data: updateData,
  });

  try {
    return {
      statusCode: 200,
      body: {
        message: "Artwork updated successfully",
        artwork: updatedArtwork,
      },
    };
  } catch (error) {
    console.error("Error updating artwork:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
