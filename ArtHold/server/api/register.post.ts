// ArtHold/server/api/register.post.ts
import { PrismaClient } from "@prisma/client";

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

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

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
