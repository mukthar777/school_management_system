"use client";
import React, { useState, useEffect } from "react";
import StudentFilter from "./StudentFilter";
import Link from "next/link";

interface Student {
  admissionNo: string;
  name: string;
  contact: string;
  enrollmentDate: string;
  classId: number;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [availableClasses, setAvailableClasses] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students");
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchClasses = async () => {
      // Fetch available classes from the API or define them statically
      const classes = [1, 2, 3, 4]; // Example class IDs
      setAvailableClasses(classes);
    };

    fetchStudents();
    fetchClasses();
  }, []);

  // Filter students based on the search term and selected class
  useEffect(() => {
    const filtered = students.filter((student) => {
      const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = selectedClass === null || student.classId === selectedClass;
      return matchesName && matchesClass;
    });
    setFilteredStudents(filtered);
  }, [searchTerm, selectedClass, students]);

  return (
    <div className="p-4">
      <h1 className="text-4xl text-center font-bold mb-4">Student List</h1>
      <Link href="/" legacyBehavior>
          <a className="px-6 py-3 absolute top-3 right-5 bg-blue-800 text-white text-lg rounded-md shadow-md hover:bg-blue-900 transition duration-200">
            Home
          </a>
        </Link>
      <StudentFilter 
        onSearch={setSearchTerm} 
        availableClasses={availableClasses} 
        onFilterClass={setSelectedClass} 
      />
      {filteredStudents.length > 0 ? (
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="p-2 border">Admission No</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Enrollment Date</th>
              <th className="p-2 border">Class ID</th>
            </tr>
          </thead>
          <tbody >
            {filteredStudents.map((student) => (
              <tr key={student.admissionNo} className="odd:bg-gray-100 hover:bg-gray-200">
                <td className="p-2 border">{student.admissionNo}</td>
                <td className="p-2 border">{student.name}</td>
                <td className="p-2 border">{student.contact}</td>
                <td className="p-2 border">{new Date(student.enrollmentDate).toLocaleDateString()}</td>
                <td className="p-2 border">{student.classId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students available.</p>
      )}
    </div>
  );
};

export default StudentList;
