import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/account",
    signUp: "/account/signup",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Always redirect to /dashboard after sign-in
      return "/dashboard";
    },
  },
});

export { handler as GET, handler as POST };
