import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
      async authorize(credentials: any) {
        const user = {
          nickname: "marcus",
          password: "aurelius",
        };
        if (
          credentials?.nickname === user.nickname &&
          credentials?.password === user.password
        ) {
          return user;
        }
      },
    }),
  ],
  callbacks: {
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
