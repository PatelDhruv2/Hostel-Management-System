import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const { issue, room_number } = await req.json();

    // Get student ID from email
    const student = await prisma.student1.findUnique({
      where: {
        email: session.user.email
      }
    });

    if (!student) {
      return new Response(JSON.stringify({ error: 'Student not found' }), {
        status: 404,
      });
    }

    // Create feedback entry
    const feedback = await prisma.feedback.create({
      data: {
        student1_id: student.id,
        issue,
        room_number,
      },
    });

    return new Response(JSON.stringify(feedback), {
      status: 200,
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit feedback' }), {
      status: 500,
    });
  }
} 