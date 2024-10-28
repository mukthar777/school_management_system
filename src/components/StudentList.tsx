"use client";
import { useEffect, useState } from "react";

// Define the Student interface
interface Student {
  admissionNo: string; // Ensure this matches the type in your database (varchar)
  name: string;
  contact: string;
  enrollmentDate: string;
  classId: number;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students");

        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Ensure data is an array
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          throw new Error("Invalid data format: Expected an array.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading whether success or error
      }
    };

    fetchStudents();
  }, []);

  // Render the UI
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>

      {/* Handle loading state */}
      {loading && <p>Loading...</p>}

      {/* Handle error state */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Render student list if available */}
      {!loading && !error && students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li key={student.admissionNo} className="border-b py-2">
              <p>Name: {student.name}</p>
              <p>Contact: {student.contact}</p>
              <p>Enrollment Date: {new Date(student.enrollmentDate).toLocaleDateString()}</p>
              <p>Class ID: {student.classId}</p>
            </li>
          ))}
        </ul>
      ) : (
        // Fallback message if no students found
        !loading && <p>No students available.</p>
      )}
    </div>
  );
};

export default StudentList;
