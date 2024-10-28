// src/components/StudentList.tsx
"use client";
import { useEffect, useState } from "react";

interface Student {
  admissionNo: number;
  name: string;
  contact: string;
  enrollmentDate: string;
  classId: number;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/api/students");
      const data = await response.json();
      setStudents(data);
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
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
    </div>
  );
};

export default StudentList;
