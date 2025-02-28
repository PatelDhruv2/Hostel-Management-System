import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const data = await req.json();
    
    // First, update the Student1 record
    const student1 = await prisma.student1.update({
      where: {
        email: session.user.email
      },
      data: {
        name: data.name,
        gender: data.gender,
        age: parseInt(data.age),
      },
    });

    // Create or update college record
    const college = await prisma.college.upsert({
      where: { 
        roll_number: parseInt(data.roll_number) 
      },
      update: { 
        college_name: data.college_name 
      },
      create: {
        roll_number: parseInt(data.roll_number),
        college_name: data.college_name,
      },
    });

    // Create Student2 record
    await prisma.student2.create({
      data: {
        student1_id: student1.id,
        mobile_number: data.mobile_number,
        address: data.address,
        emergency_number: data.emergency_number,
        parent_contact: data.parent_contact,
        roll_number: parseInt(data.roll_number),
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error('Profile completion error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
} 