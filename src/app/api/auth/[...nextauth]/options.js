import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GoogleProvider({
      clientId: "379976242732-ju4gb36h1jkqd417kgme6c2au28l2vn1.apps.googleusercontent.com",
      clientSecret: "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",
      redirectUri: "http://localhost:3000/api/auth/callback/google",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = {
        email: token.email,
        image: token.picture,
        name: token.name,
      };
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.email = profile.email;
        token.picture = profile.picture;
        token.name = profile.name;
      }
      return token;
    },
  },
};
