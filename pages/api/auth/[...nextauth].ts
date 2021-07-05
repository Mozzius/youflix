import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Providers.Google({
      clientId: process.env.YT_CLIENT_ID,
      clientSecret: process.env.YT_CLIENT_SECRET,
      scope:
        "https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    }),
  ],
  callbacks: {
    async jwt(token, _, account) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },
});
