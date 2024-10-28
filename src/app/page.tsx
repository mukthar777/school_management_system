// src/app/page.tsx
"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="w-full py-5 bg-blue-600 text-white text-center">
        <h1 className="text-3xl font-bold">School Management System</h1>
      </header>
      <div className="mt-5">
        <Link href="/teachers" legacyBehavior>
          <a className="block text-lg mb-2 text-blue-600 underline">Teachers List</a>
        </Link>
        <Link href="/students" legacyBehavior>
          <a className="block text-lg mb-2 text-blue-600 underline">Students List</a>
        </Link>
        <Link href="/teachers/new" legacyBehavior>
          <a className="block text-lg mb-2 text-blue-600 underline">Add Teacher</a>
        </Link>
        <Link href="/students/new" legacyBehavior>
          <a className="block text-lg mb-2 text-blue-600 underline">Add Student</a>
        </Link>
      </div>
    </div>
  );
}
