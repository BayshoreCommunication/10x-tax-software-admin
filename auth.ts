import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    // secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.otp) {
          throw new Error("Both email and OTP are required.");
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          console.error("API URL is not defined in environment variables.");
          throw new Error("Internal server error. Please try again later.");
        }

        try {
          const response = await fetch(`${apiUrl}/api/user/login-otp-verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            const errorData = await response.json();

            throw new Error(errorData.message || "Invalid server response.");
          }

          const { payload } = await response.json();

          if (!payload?.user || !payload.accessToken) {
            throw new Error("Incomplete user data received from server.");
          }

          return { ...payload.user, accessToken: payload.accessToken };
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("An error occurred during authorization.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          return { ...token, ...user };
        }

        return token;
      } catch (error) {
        console.error("JWT callback error:", error);

        return token;
      }
    },
    async session({ session, token }) {
      try {
        if (token) {
          session.user = token as any;
        }

        return session;
      } catch (error) {
        console.error("Session callback error:", error);

        return session;
      }
    },
  },
});
