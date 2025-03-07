import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.student1.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'User with this email already exists' }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if this is the first user (make them admin) or use a specific admin email pattern
    const isAdmin = email.endsWith('@admin.com'); // You can change this condition

    // Create the user
    const user = await prisma.student1.create({
      data: {
        email,
        password: hashedPassword,
        name: '', // These will be filled in later
        gender: 'MALE', // Default value
        age: 0, // Default value
        role: isAdmin ? 'admin' : 'student', // Set role based on condition
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred during registration' }),
      { status: 500 }
    );
  }
} 