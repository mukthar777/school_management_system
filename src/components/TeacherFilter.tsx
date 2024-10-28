// TeacherFilter.tsx
import React, { useState } from "react";

interface TeacherFilterProps {
  onSearch: (searchTerm: string) => void;
  availableSubjects: number[];
  onFilterSubject: (subjectId: number | null) => void;
}

const TeacherFilter: React.FC<TeacherFilterProps> = ({
  onSearch,
  availableSubjects,
  onFilterSubject,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = e.target.value ? parseInt(e.target.value) : null;
    setSelectedSubject(subjectId);
    onFilterSubject(subjectId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="flex items-center mb-4">
      <div className="relative">
        <select
          value={selectedSubject ?? ""}
          onChange={handleSubjectChange}
          className="px-4 py-2 border rounded-l-md focus:outline-none"
        >
          <option value="">All Subjects</option>
          {availableSubjects.map((id) => (
            <option key={id} value={id}>
              Subject {id}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="px-4 py-2 border rounded-r-md focus:outline-none"
      />
    </div>
  );
};

export default TeacherFilter;
