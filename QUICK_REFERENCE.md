# 🚀 Quick Reference Card - College Management System

## ⚡ FASTEST SETUP (3 Commands)

```bash
npm install
npx prisma migrate dev --name init && npm run prisma:seed
npm run dev
```

Then open: **http://localhost:3000**

---

## 📋 ESSENTIAL COMMANDS

### 🔧 Setup & Installation
```bash
# Install all dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with sample data
npm run prisma:seed
```

### 🏃 Running the Application
```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start
```

### 🗄️ Database Management
```bash
# Open Prisma Studio (Database GUI)
npm run prisma:studio

# Create new migration
npx prisma migrate dev --name description

# Reset database (⚠️ Deletes all data)
npx prisma migrate reset

# Deploy migrations to production
npx prisma migrate deploy
```

### 🧹 Maintenance
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Check MySQL status
sudo service mysql status

# Start MySQL
sudo service mysql start
```

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| **Application** | http://localhost:3000 |
| **Prisma Studio** | http://localhost:5555 |

---

## 📁 KEY FILES TO EDIT

| File | Purpose |
|------|---------|
| `.env` | Database connection string |
| `prisma/schema.prisma` | Database schema |
| `app/api/*/route.ts` | API endpoints |
| `app/*/page.tsx` | Frontend pages |
| `components/*.tsx` | Reusable components |

---

## 🔗 API ENDPOINTS

| Entity | GET All | GET One | POST | PUT | DELETE |
|--------|---------|---------|------|-----|--------|
| Students | `/api/students` | `/api/students?id=1` | ✓ | ✓ | ✓ |
| Faculty | `/api/faculty` | `/api/faculty?id=1` | ✓ | ✓ | ✓ |
| Courses | `/api/courses` | `/api/courses?id=1` | ✓ | ✓ | ✓ |
| Enrollment | `/api/enrollment` | `/api/enrollment?id=1` | ✓ | ✓ | ✓ |
| Teaching | `/api/teaching` | `/api/teaching?id=1` | ✓ | ✓ | ✓ |

---

## 🐛 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| **Port in use** | `lsof -ti:3000 \| xargs kill -9` |
| **Database error** | Check `.env` DATABASE_URL |
| **Prisma errors** | `npx prisma generate` |
| **Module not found** | `npm install` |
| **Migration error** | `npx prisma migrate reset` |

---

## 📊 DATABASE SCHEMA

```
Student → Enrollment → Course
Faculty → Teaching → Course
```

**Entities:**
- Student (5 seeded)
- Faculty (3 seeded)
- Course (5 seeded)
- Enrollment (7 seeded)
- Teaching (5 seeded)

---

## 🎯 DEMO CHECKLIST

- [ ] `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Show Students page
- [ ] Add new student
- [ ] Edit student
- [ ] Show Enrollment with dropdowns
- [ ] Create enrollment
- [ ] Show Teaching assignments
- [ ] Delete record (show confirmation)
- [ ] Show API calls in browser console

---

## 🚀 DEPLOYMENT QUICK

### Vercel
```bash
git push origin main
# Import on vercel.com
# Add DATABASE_URL env variable
# Deploy
```

### Docker
```bash
docker build -t college-app .
docker run -p 3000:3000 college-app
```

---

## 📞 GET HELP

- **README.md** - Complete documentation
- **SETUP.md** - Setup guide
- **DEPLOYMENT.md** - Deploy guide
- **FILE_STRUCTURE.md** - Code organization

---

## ✅ SUCCESS CRITERIA

Your app is working when:
- ✅ `npm run dev` starts without errors
- ✅ http://localhost:3000 loads
- ✅ All pages accessible
- ✅ Can create/edit/delete records
- ✅ Dropdowns show data
- ✅ Toast notifications appear

---

## 🎓 PROJECT SPECS

| Spec | Value |
|------|-------|
| Framework | Next.js 14 |
| Language | TypeScript |
| Database | MySQL |
| ORM | Prisma |
| Styling | Tailwind CSS |
| HTTP Client | Axios |

---

**Keep this card handy! 📌**

*Last Updated: November 16, 2025*
