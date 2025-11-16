'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: '🏠' },
    { name: 'Students', href: '/students', icon: '👨‍🎓' },
    { name: 'Faculty', href: '/faculty', icon: '👨‍🏫' },
    { name: 'Courses', href: '/courses', icon: '📚' },
    { name: 'Enrollment', href: '/enrollment', icon: '📝' },
    { name: 'Teaching', href: '/teaching', icon: '🎓' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="glass sticky top-0 z-50 border-b border-gray-200/50 shadow-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all shadow-glow">
              <span className="text-2xl">🎓</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text">
                College Manager
              </span>
              <span className="text-xs text-gray-500">Record Management System</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  px-4 py-2 rounded-xl font-medium text-sm flex items-center space-x-2
                  transition-all duration-300 transform hover:scale-105
                  ${
                    isActive(item.href)
                      ? 'bg-gradient-primary text-white shadow-glow'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200/50 animate-slide-down">
          <div className="px-4 py-4 space-y-2 bg-white/95 backdrop-blur-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm
                  transition-all duration-300
                  ${
                    isActive(item.href)
                      ? 'bg-gradient-primary text-white shadow-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
