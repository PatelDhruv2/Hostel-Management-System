import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // First check if user exists in admin table
    let user = await prisma.admin.findFirst({
      where: { email: email }
    })
    let role = 'admin'

    // If not found in admin, check student table
    if (!user) {
      user = await prisma.student.findFirst({
        where: { email: email }
      })
      role = 'student'
    }

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
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
        message: 'Login successful',
        user: sanitizedUser
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 