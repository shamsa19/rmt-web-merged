import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";

interface Patient {
  id: string;
  fullName?: string; // adjust field names based on your patient data structure
}

interface Glove {
  id: string;
  model?: string; // adjust field names based on your glove data structure
  status?: string;
}

const AssignGlove: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [gloves, setGloves] = useState<Glove[]>([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedGlove, setSelectedGlove] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch patients list
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5000/showPatients");
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setPatients(data);
      } catch (err: any) {
        setError(err.message || "Error fetching patients");
      }
    };

    const fetchGloves = async () => {
      try {
        const response = await fetch("http://localhost:5000/showGloves");
        if (!response.ok) {
          throw new Error("Failed to fetch gloves");
        }
        const data = await response.json();
        setGloves(data);
      } catch (err: any) {
        setError(err.message || "Error fetching gloves");
      }
    };

    fetchPatients();
    fetchGloves();
  }, []);

  const handleAssign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!selectedPatient || !selectedGlove) {
      setError("Please select both a patient and a glove.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/gloves/assign", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gloveId: selectedGlove,
          patientId: selectedPatient,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Glove assigned successfully! Glove ID: " + data.gloveId);
        // Optionally navigate to dashboard after a delay:
        // setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Assignment failed.");
      }
    } catch (err: any) {
      setError(err.message || "Error connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Assign Glove to Patient</h1>

      {error && <Alert type="error" message={error} />}
      {message && <Alert type="success" message={message} />}

      <form
        onSubmit={handleAssign}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        {/* Patients Dropdown */}
        <SelectField
          label="Select Patient"
          name="patient"
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          options={[
            { label: "Select patient", value: "" },
            ...patients.map((p) => ({
              label: p.fullName || p.id,
              value: p.id,
            })),
          ]}
          required
        />

        {/* Gloves Dropdown */}
        <SelectField
          label="Select Glove"
          name="glove"
          value={selectedGlove}
          onChange={(e) => setSelectedGlove(e.target.value)}
          options={[
            { label: "Select glove", value: "" },
            ...gloves.map((g) => ({
              label: g.model ? `${g.model} - ${g.status}` : g.id,
              value: g.id,
            })),
          ]}
          required
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 mt-4"
        >
          Assign
        </button>
      </form>
    </div>
  );
};

export default AssignGlove;
