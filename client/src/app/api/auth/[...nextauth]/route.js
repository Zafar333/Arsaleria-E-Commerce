import { DevelopmentBaseUrl } from "@/utils/api/main";
import { userEndPoints } from "@/utils/api/user";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const handler = NextAuth({
  // Configure one or more authentication providers

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,

      // authorization:{
      //   params:{
      //       prompt:"consent",
      //       access_type:"offline",
      //       response_type:"code"
      //   }
      // }
    }),
    // ...add more providers here
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    ////
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const idToken = account.id_token;

          const res = await fetch(
            `${DevelopmentBaseUrl}${userEndPoints?.signinWithGoogleBackendAuth}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ idToken }),
              credentials: "include",
            },
          );

          const data = await res.json();
          if (data?.status >= 200 && data?.status <= 300) {
            // console.log("i am callback success")
            return "/";
            // return true
          }
          if (data?.status >= 400 && data?.status <= 550) {
            // console.log("i am callback error")
            // /api/auth/error?error=AccessDenied
            return false;
            // return toast.error(data?.message)
          }
        }

        return true;
      } catch (err) {
        console.error("signIn callback error:", err);
        return false; // block login on failure
      }
    },
    ///////
    /////
    async jwt({ token, account, user }) {
      if (account && user) {
        token.idToken = account.id_token;
        //  google access token is used in google apis to use services like google drive or calender start here
        token.googleAccessToken = account.access_token;
        //  google access token is used in google apis to use services like google drive or calender end here

        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.idToken = token.idToken;
      session.user = token.user;
      return session;
    },
  },
});
export { handler as GET, handler as POST };
// export default NextAuth(authOptions)
