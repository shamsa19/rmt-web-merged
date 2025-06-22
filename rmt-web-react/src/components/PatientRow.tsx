// src/components/PatientRow.tsx
import React from "react";
import { Patient } from "../types/patient";

interface Props {
  patient: Patient;
}

const PatientRow: React.FC<Props> = ({ patient }) => (
  <tr>
    <td className="px-4 py-2">{patient.fullName}</td>
    <td className="px-4 py-2">{patient.email}</td>
    <td className="px-4 py-2">{patient.phonenumber}</td>
    <td className="px-4 py-2">{patient.emergencyContact}</td>
  </tr>
);

export default PatientRow;
