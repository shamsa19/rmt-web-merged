// src/components/PatientsHeader.tsx
import React from "react";

interface Props {
  title: string;
  searchValue: string;
  onSearchChange: (val: string) => void;
  onAddPatient: () => void;
}

const PatientsHeader: React.FC<Props> = ({
  title,
  searchValue,
  onSearchChange,
  onAddPatient,
}) => (
  <div className="flex items-center justify-between mb-4">
    <h1 className="text-2xl font-bold">{title}</h1>
    <div className="flex space-x-2">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search patient…"
          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>
      <button
        onClick={onAddPatient}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        + Add Patient
      </button>
    </div>
  </div>
);

export default PatientsHeader;
