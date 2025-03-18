// DoctorFields.tsx
import React from "react";
import TextField from "./TextField";
import TextAreaField from "./TextAreaField";

interface DoctorFieldsProps {
  licenseNumber: string;
  setLicenseNumber: React.Dispatch<React.SetStateAction<string>>;
  nationalId: string;
  setNationalId: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const DoctorFields: React.FC<DoctorFieldsProps> = ({
  licenseNumber,
  setLicenseNumber,
  nationalId,
  setNationalId,
  description,
  setDescription,
}) => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Doctor Information
      </h3>
      <div className="space-y-6">
        <TextField
          label="License Number"
          name="licenseNumber"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          required
        />
        <TextField
          label="National ID"
          name="nationalId"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
          required
        />
        <TextAreaField
          label="Professional Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your specialization, experience, etc."
          required
        />
      </div>
    </div>
  );
};

export default DoctorFields;
