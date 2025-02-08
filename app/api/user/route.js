import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const body = await request.json()
    const { 
      email, 
      password, 
      role,
      name,
      rollNumber,
      college,
      mobileNumber,
      gender,
      age,
      emergencyContact,
      parentContact,
      parentEmail
    } = body

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    let user
    if (role === 'admin') {
      // Check if admin already exists
      const existingAdmin = await prisma.admin.findFirst({
        where: { email: email }
      })

      if (existingAdmin) {
        return NextResponse.json(
          { message: 'Admin already exists with this email' },
          { status: 400 }
        )
      }

      // Create new admin
      user = await prisma.admin.create({
        data: {
          name,
          email,
          password: hashedPassword,
          room_count: 0 // Default value
        }
      })
    } else {
      // Check if student already exists
      const existingStudent = await prisma.student.findFirst({
        where: {
          OR: [
            { email: email },
            { RollNumber: rollNumber }
          ]
        }
      })

      if (existingStudent) {
        return NextResponse.json(
          { message: 'Student already exists with this email or roll number' },
          { status: 400 }
        )
      }

      // Create new student
      user = await prisma.student.create({
        data: {
          name,
          email,
          password: hashedPassword,
          RollNumber: rollNumber,
          college,
          mobileNumber,
          gender,
          age: parseInt(age),
          emergencyContact,
          parentContact,
          parentEmail
        }
      })
    }

    // Create a sanitized user object (without password)
    const sanitizedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: role
    }

    return NextResponse.json(
      { 
        message: 'Registration successful',
        user: sanitizedUser
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
