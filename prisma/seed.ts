import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Seed Students
  const students = await prisma.student.createMany({
    data: [
      {
        name: 'Rahul Sharma',
        dob: new Date('2002-05-15'),
        department: 'Computer Science',
        gender: 'Male',
        phone: '9876543210',
        email: 'rahul.sharma@university.edu',
      },
      {
        name: 'Priya Patel',
        dob: new Date('2003-08-22'),
        department: 'Computer Science',
        gender: 'Female',
        phone: '9876543211',
        email: 'priya.patel@university.edu',
      },
      {
        name: 'Amit Kumar',
        dob: new Date('2002-11-30'),
        department: 'Electronics',
        gender: 'Male',
        phone: '9876543212',
        email: 'amit.kumar@university.edu',
      },
      {
        name: 'Sneha Reddy',
        dob: new Date('2003-03-18'),
        department: 'Mechanical',
        gender: 'Female',
        phone: '9876543213',
        email: 'sneha.reddy@university.edu',
      },
      {
        name: 'Vikram Singh',
        dob: new Date('2002-09-25'),
        department: 'Civil',
        gender: 'Male',
        phone: '9876543214',
        email: 'vikram.singh@university.edu',
      },
    ],
  })
  console.log(`✅ Created ${students.count} students`)

  // Seed Faculty
  const faculty = await prisma.faculty.createMany({
    data: [
      {
        name: 'Dr. Anita Deshmukh',
        department: 'Computer Science',
        designation: 'Professor',
        phone: '9988776655',
        email: 'anita.deshmukh@university.edu',
      },
      {
        name: 'Dr. Rajesh Verma',
        department: 'Electronics',
        designation: 'Associate Professor',
        phone: '9988776656',
        email: 'rajesh.verma@university.edu',
      },
      {
        name: 'Dr. Sunita Iyer',
        department: 'Computer Science',
        designation: 'Assistant Professor',
        phone: '9988776657',
        email: 'sunita.iyer@university.edu',
      },
    ],
  })
  console.log(`✅ Created ${faculty.count} faculty members`)

  // Seed Courses
  const courses = await prisma.course.createMany({
    data: [
      {
        courseName: 'Data Structures and Algorithms',
        department: 'Computer Science',
        credit: 4,
      },
      {
        courseName: 'Database Management Systems',
        department: 'Computer Science',
        credit: 3,
      },
      {
        courseName: 'Digital Electronics',
        department: 'Electronics',
        credit: 3,
      },
      {
        courseName: 'Web Development',
        department: 'Computer Science',
        credit: 3,
      },
      {
        courseName: 'Operating Systems',
        department: 'Computer Science',
        credit: 4,
      },
    ],
  })
  console.log(`✅ Created ${courses.count} courses`)

  // Fetch created records to get their IDs
  const allStudents = await prisma.student.findMany()
  const allFaculty = await prisma.faculty.findMany()
  const allCourses = await prisma.course.findMany()

  // Seed Enrollments
  const enrollments = await prisma.enrollment.createMany({
    data: [
      {
        studentId: allStudents[0].studentId,
        courseId: allCourses[0].courseId,
        grade: 'A',
      },
      {
        studentId: allStudents[0].studentId,
        courseId: allCourses[1].courseId,
        grade: 'A+',
      },
      {
        studentId: allStudents[1].studentId,
        courseId: allCourses[0].courseId,
        grade: 'B+',
      },
      {
        studentId: allStudents[1].studentId,
        courseId: allCourses[3].courseId,
        grade: 'A',
      },
      {
        studentId: allStudents[2].studentId,
        courseId: allCourses[2].courseId,
        grade: 'B',
      },
      {
        studentId: allStudents[3].studentId,
        courseId: allCourses[1].courseId,
        grade: null,
      },
      {
        studentId: allStudents[4].studentId,
        courseId: allCourses[4].courseId,
        grade: 'A-',
      },
    ],
  })
  console.log(`✅ Created ${enrollments.count} enrollments`)

  // Seed Teachings
  const teachings = await prisma.teaching.createMany({
    data: [
      {
        facultyId: allFaculty[0].facultyId,
        courseId: allCourses[0].courseId,
        semester: 'Fall 2024',
      },
      {
        facultyId: allFaculty[0].facultyId,
        courseId: allCourses[1].courseId,
        semester: 'Fall 2024',
      },
      {
        facultyId: allFaculty[1].facultyId,
        courseId: allCourses[2].courseId,
        semester: 'Fall 2024',
      },
      {
        facultyId: allFaculty[2].facultyId,
        courseId: allCourses[3].courseId,
        semester: 'Spring 2025',
      },
      {
        facultyId: allFaculty[0].facultyId,
        courseId: allCourses[4].courseId,
        semester: 'Spring 2025',
      },
    ],
  })
  console.log(`✅ Created ${teachings.count} teaching assignments`)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
