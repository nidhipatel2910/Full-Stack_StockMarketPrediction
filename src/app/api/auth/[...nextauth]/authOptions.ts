import type { NextAuthOptions, Session, User, Account, Profile, SessionStrategy } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || user.email,
          role: user.role || "user",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,   // 24 hours
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
      if (!account || !user) return false;
      const client = await clientPromise;
      const db = client.db();
      const users = db.collection("users");
      // For OAuth accounts
      if (account.provider !== "credentials") {
        if (!user.email) return false;
        const existing = await users.findOne({ email: user.email });
        if (existing && !existing.oauthProvider) {
          await users.updateOne(
            { _id: new ObjectId(existing._id) },
            { $set: { oauthProvider: account.provider } }
          );
          user.id = existing._id.toString();
          (user as { role?: string }).role = existing.role || "user";
          return true;
        }
        if (!existing) {
          await users.insertOne({
            email: user.email,
            name: user.name || user.email,
            oauthProvider: account.provider,
            role: "user",
            createdAt: new Date(),
          });
          (user as { role?: string }).role = "user";
        } else {
          (user as { role?: string }).role = existing.role || "user";
        }
      }
      return true;
    },
    async jwt({ token, user, account }: { token: JWT; user?: User; account?: Account | null }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "user";
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.id && session.user && typeof session.user === 'object') {
        (session.user as { id?: string }).id = token.id;
      }
      if (token?.role && session.user && typeof session.user === 'object') {
        (session.user as { role?: string }).role = token.role;
      }
      return session;
    },
  },
}; 