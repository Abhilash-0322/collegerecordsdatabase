# College Record Management System

A full-stack database management system for university records built with Next.js 14, TypeScript, Prisma ORM, and PostgreSQL.

## 🎓 Project Overview

This is a production-ready college management system that provides complete CRUD operations for managing:
- **Students** - Student records with personal information
- **Faculty** - Faculty members and their details
- **Courses** - Course catalog with credits
- **Enrollments** - Student course enrollments with grades
- **Teaching** - Faculty teaching assignments

### ✨ Features
- 🔄 Full CRUD operations for all entities
- 🔗 Relational data with foreign keys and cascade deletes
- 📱 Responsive design (mobile, tablet, desktop)
- 🎨 Modern UI with Tailwind CSS
- 🔔 Toast notifications for user feedback
- ⚡ Fast API responses with Prisma ORM
- 🌐 **Cloud-ready** - Deploy to Vercel, Railway, or Render
- 🆓 **Free hosting options** available

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **ORM**: Prisma
- **Database**: PostgreSQL (Neon, Supabase, Railway, or local)
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ and npm
- PostgreSQL 14+ (local) **OR** use cloud database (see hosting guide)
- Git

## ⚡ Quick Start

### Want to Host Online? (Recommended)
👉 **See [HOSTING_QUICKSTART.md](./HOSTING_QUICKSTART.md)** - Deploy in 10 minutes!

### Running Locally?
Follow the installation steps below.

---

## 🛠️ Installation & Setup

### 1. Clone or Navigate to the Project

```bash
cd /home/abhilash/codespace/collegerecordmanagement
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

#### Option A: MySQL (Recommended)

1. Install MySQL if not already installed:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server

# macOS
brew install mysql
```

2. Start MySQL service:
```bash
# Ubuntu/Debian
sudo service mysql start

# macOS
brew services start mysql
```

3. Create database:
```bash
mysql -u root -p
```

Then in MySQL shell:
```sql
CREATE DATABASE college_management;
CREATE USER 'collegeuser'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON college_management.* TO 'collegeuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### Option B: PostgreSQL (Alternative)

```bash
# Ubuntu/Debian
sudo apt install postgresql

# macOS
brew install postgresql
```

Create database:
```bash
psql -U postgres
CREATE DATABASE college_management;
\q
```

### 4. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and update with your database credentials:

**For MySQL:**
```env
DATABASE_URL="mysql://collegeuser:your_password@localhost:3306/college_management"
```

**For PostgreSQL:**
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/college_management"
```

### 5. Prisma Setup

Generate Prisma Client:
```bash
npx prisma generate
```

Run database migrations:
```bash
npx prisma migrate dev --name init
```

### 6. Seed Database (Optional)

Populate the database with sample data:
```bash
npm run prisma:seed
```

This will create:
- 5 sample students
- 3 faculty members
- 5 courses
- Multiple enrollments and teaching assignments

### 7. Run the Application

**Development mode:**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm start
```

The application will be available at: **http://localhost:3000**

## 📊 Database Schema

### Entity Relationship Diagram

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Student   │         │  Enrollment  │         │   Course    │
├─────────────┤         ├──────────────┤         ├─────────────┤
│ student_id  │◄───────┤│ enrollment_id││────────►│ course_id   │
│ name        │         │ student_id   │         │ course_name │
│ dob         │         │ course_id    │         │ department  │
│ department  │         │ grade        │         │ credit      │
│ gender      │         └──────────────┘         └─────────────┘
│ phone       │                                         ▲
│ email       │                                         │
└─────────────┘                                         │
                                                        │
┌─────────────┐         ┌──────────────┐              │
│   Faculty   │         │   Teaching   │              │
├─────────────┤         ├──────────────┤              │
│ faculty_id  │◄───────┤│ teaching_id  │──────────────┘
│ name        │         │ faculty_id   │
│ department  │         │ course_id    │
│ designation │         │ semester     │
│ phone       │         └──────────────┘
│ email       │
└─────────────┘
```

### Prisma Schema Details

- **Students**: Contains personal and academic information
- **Faculty**: Faculty member details with designation
- **Courses**: Course catalog with credits
- **Enrollment**: Many-to-many relationship between Students and Courses
- **Teaching**: Many-to-many relationship between Faculty and Courses

**Key Features:**
- Primary keys with auto-increment
- Foreign key constraints with cascade delete
- Unique constraints on email fields
- Composite unique constraints for enrollment and teaching
- Timestamps for audit tracking

## 🌐 API Documentation

All API routes follow RESTful conventions and return JSON responses.

### Students API (`/api/students`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/students` | Get all students | - |
| GET | `/api/students?id={id}` | Get student by ID | - |
| POST | `/api/students` | Create new student | `{ name, dob, department, gender, phone, email }` |
| PUT | `/api/students` | Update student | `{ studentId, name, dob, department, gender, phone, email }` |
| DELETE | `/api/students?id={id}` | Delete student | - |

### Faculty API (`/api/faculty`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/faculty` | Get all faculty | - |
| GET | `/api/faculty?id={id}` | Get faculty by ID | - |
| POST | `/api/faculty` | Create new faculty | `{ name, department, designation, phone, email }` |
| PUT | `/api/faculty` | Update faculty | `{ facultyId, name, department, designation, phone, email }` |
| DELETE | `/api/faculty?id={id}` | Delete faculty | - |

### Courses API (`/api/courses`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/courses` | Get all courses | - |
| GET | `/api/courses?id={id}` | Get course by ID | - |
| POST | `/api/courses` | Create new course | `{ courseName, department, credit }` |
| PUT | `/api/courses` | Update course | `{ courseId, courseName, department, credit }` |
| DELETE | `/api/courses?id={id}` | Delete course | - |

### Enrollment API (`/api/enrollment`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/enrollment` | Get all enrollments | - |
| GET | `/api/enrollment?id={id}` | Get enrollment by ID | - |
| POST | `/api/enrollment` | Create new enrollment | `{ studentId, courseId, grade? }` |
| PUT | `/api/enrollment` | Update enrollment | `{ enrollmentId, studentId, courseId, grade? }` |
| DELETE | `/api/enrollment?id={id}` | Delete enrollment | - |

### Teaching API (`/api/teaching`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/teaching` | Get all teaching assignments | - |
| GET | `/api/teaching?id={id}` | Get teaching by ID | - |
| POST | `/api/teaching` | Create teaching assignment | `{ facultyId, courseId, semester }` |
| PUT | `/api/teaching` | Update teaching assignment | `{ teachingId, facultyId, courseId, semester }` |
| DELETE | `/api/teaching?id={id}` | Delete teaching assignment | - |

### Response Format

**Success Response:**
```json
{
  "studentId": 1,
  "name": "Rahul Sharma",
  "email": "rahul@university.edu",
  ...
}
```

**Error Response:**
```json
{
  "error": "Error message description"
}
```

## 📁 Project Structure

```
collegerecordmanagement/
├── app/
│   ├── api/                    # API Routes
│   │   ├── students/
│   │   ├── faculty/
│   │   ├── courses/
│   │   ├── enrollment/
│   │   └── teaching/
│   ├── students/              # Student management page
│   ├── faculty/               # Faculty management page
│   ├── courses/               # Course management page
│   ├── enrollment/            # Enrollment management page
│   ├── teaching/              # Teaching management page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── DataTable.tsx          # Reusable table component
│   ├── Modal.tsx              # Modal component
│   ├── FormElements.tsx       # Form input components
│   ├── Navbar.tsx             # Navigation bar
│   └── ToastProvider.tsx      # Toast notifications
├── lib/
│   └── prisma.ts              # Prisma client singleton
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding script
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── .env.example
└── README.md
```

## 🎯 Features

### ✅ Complete CRUD Operations
- Create, Read, Update, Delete for all entities
- Real-time data synchronization
- Cascading deletes for referential integrity

### ✅ User Interface
- Modern, responsive design with Tailwind CSS
- Interactive data tables with sorting
- Modal forms for create/edit operations
- Toast notifications for user feedback
- Loading states and error handling

### ✅ Data Validation
- Required field validation
- Email format validation
- Unique constraint enforcement
- Foreign key validation
- Type-safe with TypeScript

### ✅ Database Features
- Relational database design
- Foreign key constraints with CASCADE
- Composite unique constraints
- Automatic timestamps
- Database migrations with Prisma

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run Prisma Studio (Database GUI)
npm run prisma:studio

# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Seed database
npm run prisma:seed

# Reset database (⚠️ Warning: Deletes all data)
npx prisma migrate reset
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues
- Verify MySQL/PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure database exists
- Verify user has correct privileges

### Prisma Client Not Found
```bash
npm run postinstall
```

### Migration Errors
```bash
# Reset database and migrations
npx prisma migrate reset
npx prisma migrate dev
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add DATABASE_URL environment variable
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `postgresql://user:pass@localhost:5432/db` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## 🌐 Deployment & Hosting

### 🚀 Ready to Deploy?

We have comprehensive guides for hosting your application online:

1. **[HOSTING_QUICKSTART.md](./HOSTING_QUICKSTART.md)** ⚡
   - **10-minute setup** guide
   - Deploy to Vercel + Neon (100% free)
   - Step-by-step with screenshots

2. **[CLOUD_DATABASE_SETUP.md](./CLOUD_DATABASE_SETUP.md)** ☁️
   - Detailed cloud database setup
   - Compare providers: Neon, Supabase, Railway, Render
   - Troubleshooting & best practices

3. **[DEPLOYMENT.md](./DEPLOYMENT.md)** 📦
   - Complete deployment guide
   - Multiple hosting options
   - Docker deployment
   - Production checklist

### Recommended Stack (Free Forever)
- **Database**: Neon (0.5 GB PostgreSQL)
- **Hosting**: Vercel (unlimited bandwidth)
- **Total Cost**: $0

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created for lab practical demonstration of a full-stack database management system.

## 🙏 Acknowledgments

- Next.js Documentation
- Prisma Documentation
- Tailwind CSS
- React Hot Toast
- Neon Database
- Vercel Platform

---

**Happy Coding! 🎓**

For issues or questions, please open an issue in the repository.
