// StudentFilter.tsx
import React, { useState, useEffect } from "react";

interface StudentFilterProps {
  onSearch: (searchTerm: string) => void;
  availableClasses: number[];
  onFilterClass: (classId: number | null) => void;
}

const StudentFilter: React.FC<StudentFilterProps> = ({
  onSearch,
  availableClasses,
  onFilterClass,
}) => {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = e.target.value ? parseInt(e.target.value) : null;
    setSelectedClass(classId);
    onFilterClass(classId);
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
          value={selectedClass ?? ""}
          onChange={handleClassChange}
          className="px-4 py-2 border rounded-l-md focus:outline-none"
        >
          <option value="">All Classes</option>
          {availableClasses.map((id) => (
            <option key={id} value={id}>
              Class {id}
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

export default StudentFilter;
