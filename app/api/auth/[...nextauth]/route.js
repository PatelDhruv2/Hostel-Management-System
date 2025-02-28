import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        // First check Admin table
        const admin = await prisma.admin.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (admin) {
          const passwordMatch = await bcrypt.compare(credentials.password, admin.password);
          if (!passwordMatch) {
            throw new Error('Invalid password');
          }
          return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            isAdmin: true
          };
        }

        // If not admin, check Student1 table
        const student = await prisma.student1.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!student) {
          throw new Error('No user found with this email');
        }

        const passwordMatch = await bcrypt.compare(credentials.password, student.password);
        if (!passwordMatch) {
          throw new Error('Invalid password');
        }

        return {
          id: student.id,
          email: student.email,
          name: student.name,
          isAdmin: false
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  pages: {
    signIn: '/api/Login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };