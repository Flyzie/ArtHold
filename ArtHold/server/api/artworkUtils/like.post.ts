import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const session = await getServerSession(event);
  const query = getQuery(event);
  const { artworkID } = query;

  const userID = session?.user.id;

  if (!artworkID) {
    throw createError({
      statusCode: 400,
      statusMessage: "artworkID is required",
    });
  }

  if (!userID) {
    throw createError({
      statusCode: 400,
      statusMessage: "User ID is required",
    });
  }

  let likedAlbum = await prisma.album.findFirst({
    where: {
      userID: userID,
      name: "Liked Artworks",
    },
    include: {
      assignedArtworks: true,
    },
  });

  if (!likedAlbum) {
    likedAlbum = await prisma.album.create({
      data: {
        name: "Liked Artworks",
        userID: userID,
      },
      include: {
        assignedArtworks: true,
      },
    });
  }

  const isAlreadyLiked = likedAlbum.assignedArtworks.some(
    (artwork) => artwork.id === Number(artworkID)
  );

  if (isAlreadyLiked) {
    await prisma.album.update({
      where: {
        id: likedAlbum.id,
      },
      data: {
        assignedArtworks: {
          disconnect: { id: Number(artworkID) },
        },
      },
    });

    const artwork = await prisma.artwork.update({
      where: {
        id: Number(artworkID),
      },
      data: {
        likes: {
          decrement: 1,
        },
      },
    });

    if (!artwork) {
      throw createError({
        statusCode: 400,
        statusMessage: "Artwork not found",
      });
    }

    return {
      statusCode: 200,
      body: {
        message: "Artwork unliked",
        artwork: artwork,
      },
    };
  }

  await prisma.album.update({
    where: {
      id: likedAlbum.id,
    },
    data: {
      assignedArtworks: {
        connect: { id: Number(artworkID) },
      },
    },
  });

  const artwork = await prisma.artwork.update({
    where: {
      id: Number(artworkID),
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });

  if (!artwork) {
    throw createError({
      statusCode: 400,
      statusMessage: "Artwork not found",
    });
  }
  try {
    return {
      statusCode: 200,
      body: {
        message: "Artwork like status changed",
        artwork: artwork,
      },
    };
  } catch (error) {
    console.error("Error liking/unliking artwork:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error, cannot like",
    });
  }
});
