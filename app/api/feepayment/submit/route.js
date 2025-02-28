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

    const { semester, date_of_payment, Transaction_id, mode_of_payment } = await req.json();

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

    // Create fee payment entry
    const feePayment = await prisma.feePayment.create({
      data: {
        student_id: student.id,
        semester: parseInt(semester),
        date_of_payment: new Date(date_of_payment),
        Transaction_id,
        mode_of_payment,
      },
    });

    return new Response(JSON.stringify(feePayment), {
      status: 200,
    });
  } catch (error) {
    console.error('Fee payment submission error:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit fee payment' }), {
      status: 500,
    });
  }
} 