import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Patient {
  uid: string;
  fullName: string;
  email: string;
  phonenumber: string;
  emergencyContact: string;
  // Add other fields as needed
}

const PatientsList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5000/showPatients", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ensures cookies are sent
        });
        if (response.ok) {
          const data = await response.json();
          setPatients(data.patients);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to load patients");
        }
      } catch (err: any) {
        setError("Error connecting to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <div>Loading patients...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Your Patients</h1>
      {patients.length === 0 ? (
        <div>No patients found.</div>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Emergency Contact</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.uid}>
                <td className="py-2 px-4 border-b">{patient.fullName}</td>
                <td className="py-2 px-4 border-b">{patient.email}</td>
                <td className="py-2 px-4 border-b">{patient.phonenumber}</td>
                <td className="py-2 px-4 border-b">
                  {patient.emergencyContact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        onClick={() => navigate("/dashboard")}
        className="inline-block px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default PatientsList;
