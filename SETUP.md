# College Management System - Quick Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database

**For MySQL (Recommended):**
```bash
# Start MySQL
sudo service mysql start

# Create database
mysql -u root -p << EOF
CREATE DATABASE IF NOT EXISTS college_management;
EOF
```

**Update .env with your MySQL password:**
```
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/college_management"
```

### 3. Initialize Database
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed with sample data
npm run prisma:seed
```

### 4. Run Application
```bash
npm run dev
```

Open http://localhost:3000

## Sample Data Included

After seeding, you'll have:
- 5 Students (Rahul, Priya, Amit, Sneha, Vikram)
- 3 Faculty members (Dr. Anita, Dr. Rajesh, Dr. Sunita)
- 5 Courses (DSA, DBMS, Digital Electronics, Web Dev, OS)
- Multiple enrollments and teaching assignments

## Common Issues

**Port 3000 in use:**
```bash
lsof -ti:3000 | xargs kill -9
```

**MySQL connection error:**
- Check if MySQL is running: `sudo service mysql status`
- Verify credentials in .env
- Ensure database exists

**Prisma errors:**
```bash
npx prisma generate
```

## Features to Test

1. **Students Page** - Add, edit, delete students
2. **Faculty Page** - Manage faculty records
3. **Courses Page** - Course catalog management
4. **Enrollment Page** - Enroll students in courses, assign grades
5. **Teaching Page** - Assign faculty to courses with semesters

## Project Demo Flow

1. Navigate to http://localhost:3000
2. Click "Students" - See 5 pre-loaded students
3. Add a new student using the form
4. Edit an existing student
5. Go to "Enrollment" - Link students with courses
6. Check "Teaching" - See faculty assignments
7. Test delete operations (note: cascading deletes)

## API Testing

```bash
# Get all students
curl http://localhost:3000/api/students

# Get student by ID
curl http://localhost:3000/api/students?id=1

# Create student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","dob":"2002-01-01","department":"CS","gender":"Male","phone":"1234567890","email":"test@test.com"}'
```

## Prisma Studio (Database GUI)

```bash
npm run prisma:studio
```

Access at http://localhost:5555

---
