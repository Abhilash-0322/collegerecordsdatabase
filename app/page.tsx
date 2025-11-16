export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to College Management System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A comprehensive database management system for university records
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="/students"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">👨‍🎓</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Students</h2>
            <p className="text-gray-600">Manage student records and information</p>
          </a>

          <a
            href="/faculty"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">👨‍🏫</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Faculty</h2>
            <p className="text-gray-600">Manage faculty members and details</p>
          </a>

          <a
            href="/courses"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">📚</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Courses</h2>
            <p className="text-gray-600">Manage course catalog and details</p>
          </a>

          <a
            href="/enrollment"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">📝</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Enrollment</h2>
            <p className="text-gray-600">Manage student course enrollments</p>
          </a>

          <a
            href="/teaching"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">🎯</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Teaching</h2>
            <p className="text-gray-600">Manage faculty teaching assignments</p>
          </a>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">System Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li>✅ Full CRUD operations for all entities</li>
            <li>✅ Relational database with foreign key constraints</li>
            <li>✅ Real-time data synchronization</li>
            <li>✅ Modern, responsive UI with Tailwind CSS</li>
            <li>✅ TypeScript for type safety</li>
            <li>✅ Prisma ORM for database management</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
