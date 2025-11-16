import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET all teachings or single teaching by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      // GET single teaching by ID
      const teaching = await prisma.teaching.findUnique({
        where: { teachingId: parseInt(id) },
        include: {
          faculty: true,
          course: true,
        },
      })

      if (!teaching) {
        return NextResponse.json(
          { error: 'Teaching assignment not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(teaching)
    }

    // GET all teachings
    const teachings = await prisma.teaching.findMany({
      orderBy: { teachingId: 'desc' },
      include: {
        faculty: true,
        course: true,
      },
    })

    return NextResponse.json(teachings)
  } catch (error) {
    console.error('Error fetching teachings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch teaching assignments' },
      { status: 500 }
    )
  }
}

// POST - Create new teaching assignment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { facultyId, courseId, semester } = body

    // Validation
    if (!facultyId || !courseId || !semester) {
      return NextResponse.json(
        { error: 'Faculty ID, Course ID, and Semester are required' },
        { status: 400 }
      )
    }

    const teaching = await prisma.teaching.create({
      data: {
        facultyId: parseInt(facultyId),
        courseId: parseInt(courseId),
        semester,
      },
      include: {
        faculty: true,
        course: true,
      },
    })

    return NextResponse.json(teaching, { status: 201 })
  } catch (error: any) {
    console.error('Error creating teaching assignment:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'This faculty is already assigned to this course in this semester' },
        { status: 409 }
      )
    }

    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Invalid faculty or course ID' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create teaching assignment' },
      { status: 500 }
    )
  }
}

// PUT - Update teaching assignment
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { teachingId, facultyId, courseId, semester } = body

    if (!teachingId) {
      return NextResponse.json(
        { error: 'Teaching ID is required' },
        { status: 400 }
      )
    }

    const teaching = await prisma.teaching.update({
      where: { teachingId: parseInt(teachingId) },
      data: {
        facultyId: facultyId ? parseInt(facultyId) : undefined,
        courseId: courseId ? parseInt(courseId) : undefined,
        semester: semester || undefined,
      },
      include: {
        faculty: true,
        course: true,
      },
    })

    return NextResponse.json(teaching)
  } catch (error: any) {
    console.error('Error updating teaching assignment:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Teaching assignment not found' },
        { status: 404 }
      )
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'This faculty is already assigned to this course in this semester' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update teaching assignment' },
      { status: 500 }
    )
  }
}

// DELETE - Delete teaching assignment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Teaching ID is required' },
        { status: 400 }
      )
    }

    await prisma.teaching.delete({
      where: { teachingId: parseInt(id) },
    })

    return NextResponse.json({ message: 'Teaching assignment deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting teaching assignment:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Teaching assignment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete teaching assignment' },
      { status: 500 }
    )
  }
}
