import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    subscription?: boolean;
    accessToken?: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}
