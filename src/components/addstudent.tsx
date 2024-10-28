"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const AddStudent: React.FC = () => {
  const [formData, setFormData] = useState({
    admissionNo: '',
    name: '',
    contact: '',
    enrollmentDate: '',
    classId: '',
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null); // State for status messages

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          classId: parseInt(formData.classId, 10), // Convert to integer
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      const result = await response.json();
      console.log("Student added:", result);

      // Show success message and clear the form
      setStatusMessage("Student added successfully!");
      setFormData({
        admissionNo: '',
        name: '',
        contact: '',
        enrollmentDate: '',
        classId: '',
      });

      // Clear the status message after 3 seconds
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Failed to add student. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Link href="/" legacyBehavior>
          <a className="px-6 py-3 absolute top-3 right-5 bg-blue-800 text-white text-lg rounded-md shadow-md hover:bg-blue-900 transition duration-200">
            Home
          </a>
        </Link>
      <div className="w-full max-w-lg p-10 space-y-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Add New Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="admissionNo"
            placeholder="Admission Number"
            value={formData.admissionNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-700"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-700"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-700"
            required
          />
          <input
            type="date"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-700"
            required
          />
          <input
            type="text"
            name="classId"
            placeholder="Class ID"
            value={formData.classId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-700"
            required
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Student
          </button>
        </form>
        {statusMessage && (
          <p className="text-center text-sm text-blue-500 mt-2">
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
