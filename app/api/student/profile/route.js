import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const student = await prisma.student1.findUnique({
      where: {
        email: session.user.email
      },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        age: true,
        student2: {
          select: {
            mobile_number: true,
            address: true,
            emergency_number: true,
            parent_contact: true,
            roll_number: true,
            college: {
              select: {
                college_name: true
              }
            }
          }
        }
      }
    });

    if (!student) {
      return new Response(JSON.stringify({ error: 'Student not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(student), {
      status: 200,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch profile' }), {
      status: 500,
    });
  }
} 