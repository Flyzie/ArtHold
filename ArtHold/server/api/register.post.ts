// ArtHold/server/api/register.post.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, email, password, confirmPassword } = body;

  if (!name || !email || !password || !confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "All fields are required",
    });
  }

  if (password !== confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Passwords do not match",
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists",
    });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  try {
    await prisma.album.create({
      data: {
        name: "default",
        userID: user.id,
      },
    });
  } catch (error) {
    console.error("Error creating default album:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error creating default album",
    });
  }

  return {
    statusCode: 201,
    body: {
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  };
});
