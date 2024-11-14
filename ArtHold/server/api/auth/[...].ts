import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: "your-secret-here",
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: "Ov23limJtRomKBJhOofo",
      clientSecret: "62204853902b100f5c28c72eb19012ddb271153b",
    }),

    // @ts-expect-error Use .default here for it to work during SSR.
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          console.log(user);
          return user;
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = Number(user.id);
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Ensure the URL is valid
      try {
        new URL(url);
        return url;
      } catch {
        return baseUrl;
      }
    },
  },
});
