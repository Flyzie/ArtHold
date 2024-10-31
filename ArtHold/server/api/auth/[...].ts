import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client/extension";

/*
const prisma = new PrismaClient();
*/
export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: "your-secret-here",
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: "Ov23limJtRomKBJhOofo",
      clientSecret: "62204853902b100f5c28c72eb19012ddb271153b",
    }),
    /*
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
        if (user && credentials.password === user.password) {
          console.log(user);
          return user;
        } else {
          throw createError({
            statusCode: 404,
            statusMessage: "user not Found",
          });
        }
      },
    }),*/
  ],
  //adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
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
