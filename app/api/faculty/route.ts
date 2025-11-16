import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET all faculty or single faculty by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      // GET single faculty by ID
      const faculty = await prisma.faculty.findUnique({
        where: { facultyId: parseInt(id) },
        include: {
          teachings: {
            include: {
              course: true,
            },
          },
        },
      })

      if (!faculty) {
        return NextResponse.json(
          { error: 'Faculty not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(faculty)
    }

    // GET all faculty
    const faculty = await prisma.faculty.findMany({
      orderBy: { facultyId: 'desc' },
      include: {
        teachings: {
          include: {
            course: true,
          },
        },
      },
    })

    return NextResponse.json(faculty)
  } catch (error) {
    console.error('Error fetching faculty:', error)
    return NextResponse.json(
      { error: 'Failed to fetch faculty' },
      { status: 500 }
    )
  }
}

// POST - Create new faculty
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, department, designation, phone, email } = body

    // Validation
    if (!name || !department || !designation || !phone || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const faculty = await prisma.faculty.create({
      data: {
        name,
        department,
        designation,
        phone,
        email,
      },
    })

    return NextResponse.json(faculty, { status: 201 })
  } catch (error: any) {
    console.error('Error creating faculty:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create faculty' },
      { status: 500 }
    )
  }
}

// PUT - Update faculty
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { facultyId, name, department, designation, phone, email } = body

    if (!facultyId) {
      return NextResponse.json(
        { error: 'Faculty ID is required' },
        { status: 400 }
      )
    }

    const faculty = await prisma.faculty.update({
      where: { facultyId: parseInt(facultyId) },
      data: {
        name,
        department,
        designation,
        phone,
        email,
      },
    })

    return NextResponse.json(faculty)
  } catch (error: any) {
    console.error('Error updating faculty:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Faculty not found' },
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
      { error: 'Failed to update faculty' },
      { status: 500 }
    )
  }
}

// DELETE - Delete faculty
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Faculty ID is required' },
        { status: 400 }
      )
    }

    await prisma.faculty.delete({
      where: { facultyId: parseInt(id) },
    })

    return NextResponse.json({ message: 'Faculty deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting faculty:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Faculty not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete faculty' },
      { status: 500 }
    )
  }
}
