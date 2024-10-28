"use client";
import React, { useState, useEffect } from "react";
import TeacherFilter from "./TeacherFilter";
import Link from "next/link";

interface Teacher {
  registerNo: string;
  name: string;
  contact: string;
  subjectId: number;
}

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("/api/teachers");
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setTeachers(data);
        setFilteredTeachers(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSubjects = async () => {
      // Fetch available subjects from the API or define them statically
      const subjects = [1, 2, 3, 4]; // Example subject IDs
      setAvailableSubjects(subjects);
    };

    fetchTeachers();
    fetchSubjects();
  }, []);

  // Filter teachers based on the search term and selected subject
  useEffect(() => {
    const filtered = teachers.filter((teacher) => {
      const matchesName = teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === null || teacher.subjectId === selectedSubject;
      return matchesName && matchesSubject;
    });
    setFilteredTeachers(filtered);
  }, [searchTerm, selectedSubject, teachers]);

  return (
    <div className="p-4">
      <h1 className="text-4xl text-center font-bold mb-4">Teacher List</h1>
      <Link href="/" legacyBehavior>
          <a className="px-6 py-3 absolute top-3 right-5 bg-blue-800 text-white text-lg rounded-md shadow-md hover:bg-blue-900 transition duration-200">
            Home
          </a>
        </Link>
      <TeacherFilter 
        onSearch={setSearchTerm} 
        availableSubjects={availableSubjects} 
        onFilterSubject={setSelectedSubject} 
      />
      {filteredTeachers.length > 0 ? (
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="p-2 border">Register No</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Subject ID</th>
            </tr>
          </thead>
          <tbody >
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.registerNo} className="odd:bg-gray-100 hover:bg-gray-200">
                <td className="p-2 border">{teacher.registerNo}</td>
                <td className="p-2 border">{teacher.name}</td>
                <td className="p-2 border">{teacher.contact}</td>
                <td className="p-2 border">{teacher.subjectId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No teachers available.</p>
      )}
    </div>
  );
};

export default TeacherList;
