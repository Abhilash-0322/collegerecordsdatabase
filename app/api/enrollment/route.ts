import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET all enrollments or single enrollment by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      // GET single enrollment by ID
      const enrollment = await prisma.enrollment.findUnique({
        where: { enrollmentId: parseInt(id) },
        include: {
          student: true,
          course: true,
        },
      })

      if (!enrollment) {
        return NextResponse.json(
          { error: 'Enrollment not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(enrollment)
    }

    // GET all enrollments
    const enrollments = await prisma.enrollment.findMany({
      orderBy: { enrollmentId: 'desc' },
      include: {
        student: true,
        course: true,
      },
    })

    return NextResponse.json(enrollments)
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    )
  }
}

// POST - Create new enrollment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentId, courseId, grade } = body

    // Validation
    if (!studentId || !courseId) {
      return NextResponse.json(
        { error: 'Student ID and Course ID are required' },
        { status: 400 }
      )
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: parseInt(studentId),
        courseId: parseInt(courseId),
        grade: grade || null,
      },
      include: {
        student: true,
        course: true,
      },
    })

    return NextResponse.json(enrollment, { status: 201 })
  } catch (error: any) {
    console.error('Error creating enrollment:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Student is already enrolled in this course' },
        { status: 409 }
      )
    }

    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Invalid student or course ID' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    )
  }
}

// PUT - Update enrollment
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { enrollmentId, studentId, courseId, grade } = body

    if (!enrollmentId) {
      return NextResponse.json(
        { error: 'Enrollment ID is required' },
        { status: 400 }
      )
    }

    const enrollment = await prisma.enrollment.update({
      where: { enrollmentId: parseInt(enrollmentId) },
      data: {
        studentId: studentId ? parseInt(studentId) : undefined,
        courseId: courseId ? parseInt(courseId) : undefined,
        grade: grade !== undefined ? grade : undefined,
      },
      include: {
        student: true,
        course: true,
      },
    })

    return NextResponse.json(enrollment)
  } catch (error: any) {
    console.error('Error updating enrollment:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Student is already enrolled in this course' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update enrollment' },
      { status: 500 }
    )
  }
}

// DELETE - Delete enrollment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Enrollment ID is required' },
        { status: 400 }
      )
    }

    await prisma.enrollment.delete({
      where: { enrollmentId: parseInt(id) },
    })

    return NextResponse.json({ message: 'Enrollment deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting enrollment:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete enrollment' },
      { status: 500 }
    )
  }
}
