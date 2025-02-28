import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          // Check if user already exists
          const existingUser = await prisma.student.findFirst({
            where: { email: user.email }
          })

          if (!existingUser) {
            // Store basic info from Google, rest will be filled in form
            const tempPassword = await bcrypt.hash(Math.random().toString(36), 10)
            
            // Create temporary user entry
            await prisma.student.create({
              data: {
                email: user.email,
                name: user.name,
                password: tempPassword,
                Roll_Number: '', // These fields will be updated later
                college: '',
                mobile_number: '',
                address: '',
                room_number: '',
                gender: 'Male', // Default value
                age: 0,
                emergency_contact: '',
                parent_contact: '',
                parent_email: ''
              }
            })
          }
        } catch (error) {
          console.error("Error during Google sign in:", error)
          return false
        }
      }
      return true
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/complete-profile`;
    },
  },
  pages: {
    signIn: '/signup',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };