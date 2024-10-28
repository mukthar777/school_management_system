"use client";
import { useEffect, useState } from "react";

// Define the Teacher interface
interface Teacher {
  registerNo: number;
  name: string;
  contact: string;
  subjectId: number;
}

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("/api/teachers");

        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Ensure data is an array
        if (Array.isArray(data)) {
          setTeachers(data);
        } else {
          throw new Error("Invalid data format: Expected an array.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading whether success or error
      }
    };

    fetchTeachers();
  }, []);

  // Render the UI
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher List</h1>

      {/* Handle loading state */}
      {loading && <p>Loading...</p>}

      {/* Handle error state */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Render teacher list if available */}
      {!loading && !error && teachers.length > 0 ? (
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher.registerNo} className="border-b py-2">
              <p>Name: {teacher.name}</p>
              <p>Contact: {teacher.contact}</p>
              <p>Subject ID: {teacher.subjectId}</p>
            </li>
          ))}
        </ul>
      ) : (
        // Fallback message if no teachers found
        !loading && <p>No teachers available.</p>
      )}
    </div>
  );
};

export default TeacherList;
