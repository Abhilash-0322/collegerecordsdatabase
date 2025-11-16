#!/bin/bash

echo "🎓 College Management System - Setup Script"
echo "==========================================="
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update DATABASE_URL in .env file with your database credentials"
    echo ""
    read -p "Press enter to continue after updating .env..."
fi

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo "✅ Prisma Client generated"
echo ""

# Run migrations
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name init

if [ $? -ne 0 ]; then
    echo "❌ Failed to run migrations"
    echo "Please check:"
    echo "  1. Database is running"
    echo "  2. DATABASE_URL in .env is correct"
    echo "  3. Database exists"
    exit 1
fi

echo "✅ Database migrations completed"
echo ""

# Seed database
echo "🌱 Seeding database with sample data..."
npm run prisma:seed

if [ $? -ne 0 ]; then
    echo "⚠️  Failed to seed database (non-critical)"
else
    echo "✅ Database seeded successfully"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "The application will be available at:"
echo "  http://localhost:3000"
echo ""
echo "Happy coding! 🚀"
