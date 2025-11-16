import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: '👨‍🎓',
      title: 'Students',
      description: 'Manage student records, personal information, and academic details',
      href: '/students',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '👨‍🏫',
      title: 'Faculty',
      description: 'Handle faculty members, departments, and contact information',
      href: '/faculty',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '📚',
      title: 'Courses',
      description: 'Organize course catalog, credits, and academic programs',
      href: '/courses',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: '📝',
      title: 'Enrollment',
      description: 'Track student course enrollments, grades, and progress',
      href: '/enrollment',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: '🎓',
      title: 'Teaching',
      description: 'Manage faculty teaching assignments and course schedules',
      href: '/teaching',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  const stats = [
    { label: 'Students', value: '2,500+', icon: '👥' },
    { label: 'Faculty', value: '150+', icon: '👨‍🏫' },
    { label: 'Courses', value: '500+', icon: '📚' },
    { label: 'Enrollments', value: '10K+', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center fade-in">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-primary text-white text-sm font-medium shadow-glow">
                ✨ Next Generation College Management
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to
              <span className="block gradient-text mt-2">College Manager</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              A comprehensive, modern database management system for university records.
              Built with Next.js, TypeScript, and PostgreSQL.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/students"
                className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold shadow-large hover:shadow-glow-lg"
              >
                Get Started →
              </Link>
              <a
                href="#features"
                className="px-8 py-4 rounded-xl bg-white text-gray-700 font-semibold shadow-medium hover:shadow-large border border-gray-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass p-6 rounded-2xl text-center card-hover shadow-soft"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Manage Everything in One Place
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to streamline college administration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="glass p-8 rounded-2xl card-hover shadow-soft group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all shadow-medium`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:gradient-text transition-all">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-primary-500 font-semibold">
                Explore
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* System Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto glass p-10 rounded-3xl shadow-large">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            <span className="gradient-text">System Features</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              '✅ Full CRUD operations for all entities',
              '✅ Relational database with foreign keys',
              '✅ Real-time data synchronization',
              '✅ Modern, responsive UI design',
              '✅ TypeScript for type safety',
              '✅ Prisma ORM for database management',
              '✅ Secure authentication ready',
              '✅ Cloud-ready deployment',
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 rounded-xl hover:bg-white/50 transition-all"
              >
                <span className="text-2xl">{feature.split(' ')[0]}</span>
                <span className="text-gray-700 font-medium pt-1">
                  {feature.substring(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-primary p-12 rounded-3xl shadow-glow-lg">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Explore the system and manage your college records efficiently
            </p>
            <Link
              href="/students"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-xl font-bold shadow-large hover:shadow-glow-lg transform hover:scale-105 transition-all"
            >
              Start Managing Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
