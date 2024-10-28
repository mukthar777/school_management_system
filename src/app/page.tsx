// src/app/page.tsx
"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text h-20 bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg tracking-wide">
          School Management System
        </h1>
        <p className="text-gray-600 mt-10 text-xl font-semibold">
          Manage your students, teachers, and classes efficiently
        </p>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link href="/teachers" legacyBehavior>
          <a className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md shadow-md hover:bg-blue-600 transition duration-200">
            View Teachers
          </a>
        </Link>
        <Link href="/students" legacyBehavior>
          <a className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md shadow-md hover:bg-blue-600 transition duration-200">
            View Students
          </a>
        </Link>
        <Link href="/teachers/new" legacyBehavior>
          <a className="px-6 py-3 bg-green-500 text-white text-lg rounded-md shadow-md hover:bg-green-600 transition duration-200">
            Add Teacher
          </a>
        </Link>
        <Link href="/students/new" legacyBehavior>
          <a className="px-6 py-3 bg-green-500 text-white text-lg rounded-md shadow-md hover:bg-green-600 transition duration-200">
            Add Student
          </a>
        </Link>
      </div>
    </div>
  );
}
