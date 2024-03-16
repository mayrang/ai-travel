import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { createUser } from "./service/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user, account, profile);
      if (!profile?.id || !user.image || !user.name) {
        return false;
      }
      const schemaUser = {
        id: profile.id.toString(),
        image: user.image,
        name: user.name,
      };
      user.id = profile.id.toString();
      const result = await createUser(schemaUser);
      console.log("result", result);
      return true;
    },
    async jwt({ token, user }) {
      // console.log("jwt", token, user)
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session", session, token)
      const checkUser = session?.user;
      if (checkUser) {
        session.user.id = token.id as string;
      }
      //console.log("session", token, session)
      return session;
    },
  },
});
