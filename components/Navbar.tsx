import React from 'react'

export default function Navbar() {
  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold">
              🎓 College Management System
            </a>
          </div>
          <div className="flex space-x-4">
            <a
              href="/students"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
            >
              Students
            </a>
            <a
              href="/faculty"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
            >
              Faculty
            </a>
            <a
              href="/courses"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
            >
              Courses
            </a>
            <a
              href="/enrollment"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
            >
              Enrollment
            </a>
            <a
              href="/teaching"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
            >
              Teaching
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
