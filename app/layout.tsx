import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import ToastProvider from '@/components/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'College Manager - Record Management System',
  description: 'Modern full-stack database management system for university records',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <Navbar />
          <main className="min-h-[calc(100vh-5rem)]">
            {children}
          </main>
          <footer className="border-t border-gray-200/50 mt-20">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center text-gray-600">
                <p className="text-sm">
                  © 2025 College Manager. Built with Next.js, TypeScript & PostgreSQL
                </p>
              </div>
            </div>
          </footer>
        </div>
        <ToastProvider />
      </body>
    </html>
  )
}
