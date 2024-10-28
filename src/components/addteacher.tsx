"use client";
import React, { useState } from "react";

const AddTeacher: React.FC = () => {
  const [formData, setFormData] = useState({
    registerNo: "",
    name: "",
    contact: "",
    subjectId: "", // Changed to align with schema
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subjectId: parseInt(formData.subjectId, 10), // Convert to integer
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add teacher");
      }

      const result = await response.json();
      console.log("Teacher added:", result);

      // Show success message and clear the form
      setStatusMessage("Teacher added successfully!");
      setFormData({ registerNo: "", name: "", contact: "", subjectId: "" });

      // Clear the status message after 3 seconds
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Failed to add teacher. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-center">Add Teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="registerNo"
            placeholder="Register Number"
            value={formData.registerNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number" // Changed input type to number for subjectId
            name="subjectId"
            placeholder="Subject ID"
            value={formData.subjectId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Add Teacher
          </button>
        </form>
        {statusMessage && (
          <p className="text-center text-sm text-red-500 mt-2">
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddTeacher;
