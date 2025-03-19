import React, { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Table from "../components/Table";

interface Appointment {
  id: string;
  date: string;
  time: string;
  patientId: string;
  doctorId: string;
  description?: string;
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/showAppointment");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err: any) {
        setError(err.message || "Error fetching appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  const headers = [
    "ID",
    "Date",
    "Time",
    "Patient ID",
    "Doctor ID",
    "Description",
  ];
  const rows = appointments.map((appt) => [
    appt.id,
    appt.date,
    appt.time,
    appt.patientId,
    appt.doctorId,
    appt.description || "N/A",
  ]);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      {error && <Alert type="error" message={error} />}
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <Table headers={headers} rows={rows} />
      )}
    </div>
  );
};

export default Appointments;
