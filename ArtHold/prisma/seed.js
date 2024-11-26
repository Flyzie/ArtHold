import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  // Create users
  const users = [
    {
      name: "seneca",
      description: "Philosopher and Statesman",
      image: "https://example.com/seneca.jpg",
      likedArtworks: 3,
      email: "seneca@example.com",
      password: await bcrypt.hash("stoic", 10), // Ensure passwords are hashed
    },
    {
      name: "epictetus",
      description: "Philosopher and Teacher",
      image: "https://example.com/epictetus.jpg",
      likedArtworks: 7,
      email: "epictetus@example.com",
      password: await bcrypt.hash("freedom", 10), // Ensure passwords are hashed
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  // Fetch all users
  const allUsers = await prisma.user.findMany();

  // Create albums for each user
  for (const user of allUsers) {
    await prisma.album.create({
      data: {
        name: "Default Album",
        userID: user.id,
      },
    });
  }

  // Fetch all albums
  const allAlbums = await prisma.album.findMany();

  // Create 100 artworks
  const artworks = [];
  for (let i = 1; i <= 100; i++) {
    const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
    const randomAlbum = allAlbums[Math.floor(Math.random() * allAlbums.length)];
    artworks.push({
      title: `Artwork ${i}`,
      description: `Description for artwork ${i}`,
      artworkImage: `https://example.com/artwork${i}.jpg`,
      likes: Math.floor(Math.random() * 100),
      userID: randomUser.id,
      albumID: randomAlbum.id,
    });
  }

  for (const artwork of artworks) {
    await prisma.artwork.create({
      data: artwork,
    });
  }

  console.log("Seed data created successfully.");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
