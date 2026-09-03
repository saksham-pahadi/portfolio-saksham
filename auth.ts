import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        await connectDB();
        let user = await User.findOne({ email }).lean();
        if (!user) {
          const bootEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
          const bootPassword = process.env.ADMIN_PASSWORD;
          if (bootEmail && bootPassword && email === bootEmail && password === bootPassword) {
            const passwordHash = await bcrypt.hash(password, 12);
            const created = await User.create({ name: "Saksham Admin", email, passwordHash, role: "admin" });
            user = created.toObject();
          }
        }
        if (!user || user.role !== "admin") return null;
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;
        return { id: String(user._id), name: user.name, email: user.email, role: "admin" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? "");
        session.user.role = "admin";
      }
      return session;
    },
  },
});
