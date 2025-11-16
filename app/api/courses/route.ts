import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET all courses or single course by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      // GET single course by ID
      const course = await prisma.course.findUnique({
        where: { courseId: parseInt(id) },
        include: {
          enrollments: {
            include: {
              student: true,
            },
          },
          teachings: {
            include: {
              faculty: true,
            },
          },
        },
      })

      if (!course) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(course)
    }

    // GET all courses
    const courses = await prisma.course.findMany({
      orderBy: { courseId: 'desc' },
      include: {
        enrollments: true,
        teachings: true,
      },
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

// POST - Create new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { courseName, department, credit } = body

    // Validation
    if (!courseName || !department || credit === undefined) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const course = await prisma.course.create({
      data: {
        courseName,
        department,
        credit: parseInt(credit),
      },
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error: any) {
    console.error('Error creating course:', error)

    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}

// PUT - Update course
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { courseId, courseName, department, credit } = body

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    const course = await prisma.course.update({
      where: { courseId: parseInt(courseId) },
      data: {
        courseName,
        department,
        credit: credit ? parseInt(credit) : undefined,
      },
    })

    return NextResponse.json(course)
  } catch (error: any) {
    console.error('Error updating course:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
  }
}

// DELETE - Delete course
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    await prisma.course.delete({
      where: { courseId: parseInt(id) },
    })

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting course:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}
