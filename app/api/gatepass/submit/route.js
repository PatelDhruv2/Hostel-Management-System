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

    const { reason, leave_date, arrival_date } = await req.json();

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

    // Create gate pass entry
    const gatePass = await prisma.gatePass.create({
      data: {
        student1_id: student.id,
        reason,
        leave_date: new Date(leave_date),
        arrival_date: new Date(arrival_date),
        approval: 'PENDING', // Default status
      },
    });

    return new Response(JSON.stringify(gatePass), {
      status: 200,
    });
  } catch (error) {
    console.error('Gate pass submission error:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit gate pass request' }), {
      status: 500,
    });
  }
} 