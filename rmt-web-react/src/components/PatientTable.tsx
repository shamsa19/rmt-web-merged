// src/components/PatientsTable.tsx
import React from "react";
import { Patient } from "../types/patient";
import PatientRow from "./PatientRow";

interface Props {
  patients: Patient[];
}

const PatientsTable: React.FC<Props> = ({ patients }) => (
  <div className="overflow-x-auto shadow-md rounded-lg bg-white mb-4">
    <table className="min-w-full divide-y">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-left">Full Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Phone</th>
          <th className="px-4 py-2 text-left">Emergency Contact</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {patients.map((p) => (
          <PatientRow key={p.id} patient={p} />
        ))}
      </tbody>
    </table>
  </div>
);

export default PatientsTable;
