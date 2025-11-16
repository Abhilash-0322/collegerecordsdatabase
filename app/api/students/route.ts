import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET all students
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      // GET single student by ID
      const student = await prisma.student.findUnique({
        where: { studentId: parseInt(id) },
        include: {
          enrollments: {
            include: {
              course: true,
            },
          },
        },
      })

      if (!student) {
        return NextResponse.json(
          { error: 'Student not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(student)
    }

    // GET all students
    const students = await prisma.student.findMany({
      orderBy: { studentId: 'desc' },
      include: {
        enrollments: {
          include: {
            course: true,
          },
        },
      },
    })

    return NextResponse.json(students)
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

// POST - Create new student
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, dob, department, gender, phone, email } = body

    // Validation
    if (!name || !dob || !department || !gender || !phone || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const student = await prisma.student.create({
      data: {
        name,
        dob: new Date(dob),
        department,
        gender,
        phone,
        email,
      },
    })

    return NextResponse.json(student, { status: 201 })
  } catch (error: any) {
    console.error('Error creating student:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    )
  }
}

// PUT - Update student
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentId, name, dob, department, gender, phone, email } = body

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }

    const student = await prisma.student.update({
      where: { studentId: parseInt(studentId) },
      data: {
        name,
        dob: dob ? new Date(dob) : undefined,
        department,
        gender,
        phone,
        email,
      },
    })

    return NextResponse.json(student)
  } catch (error: any) {
    console.error('Error updating student:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    )
  }
}

// DELETE - Delete student
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }

    await prisma.student.delete({
      where: { studentId: parseInt(id) },
    })

    return NextResponse.json({ message: 'Student deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting student:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    )
  }
}
