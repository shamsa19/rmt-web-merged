// AppointmentDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../CSS/AppointmentDetail.css";

interface AppointmentRaw {
  id: string;
  dateTime: { seconds: number; nanoseconds: number };
  notes: string;
  status: string;
  patientId: string;
  doctorId: string;
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
}

interface AppointmentDetail {
  id: string;
  start: Date;
  end: Date;
  notes: string;
  status: string;
  patientId: string;
  patientName?: string;
  doctorId: string;
  doctorName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentDetail: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [appt, setAppt] = useState<AppointmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!appointmentId) {
      setError("No appointment ID provided");
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/ShowAppointment/${appointmentId}`,
          {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: AppointmentRaw = await res.json();
        const start = new Date(data.dateTime.seconds * 1000);
        const end = new Date(start.getTime() + 30 * 60 * 1000);

        const [patientRes, doctorRes] = await Promise.all([
          fetch(`http://localhost:5000/showPatients/${data.patientId}`, {
            credentials: "include",
          }),
          fetch(`http://localhost:5000/doctors/${data.doctorId}`, {
            credentials: "include",
          }),
        ]);
        const patientData = patientRes.ok
          ? await patientRes.json()
          : { fullName: data.patientId };
        const doctorData = doctorRes.ok
          ? await doctorRes.json()
          : { name: data.doctorId };

        setAppt({
          id: data.id,
          start,
          end,
          notes: data.notes,
          status: data.status,
          patientId: data.patientId,
          patientName: patientData.fullName,
          doctorId: data.doctorId,
          doctorName: doctorData.name,
          createdAt: new Date(data.createdAt.seconds * 1000),
          updatedAt: new Date(data.updatedAt.seconds * 1000),
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [appointmentId]);

  if (loading)
    return <div className="appt-loading">Loading appointment...</div>;
  if (error) return <div className="appt-error">Error: {error}</div>;
  if (!appt) return <div className="appt-error">Appointment not found.</div>;

  return (
    <div className="appt-detail">
      <Link to="/appointments" className="appt-detail__back">
        ← Back to Appointments
      </Link>
      <h1 className="appt-detail__title">Appointment Details</h1>
      <div className="appt-detail__grid">
        <div className="appt-detail__item">
          <strong>ID:</strong> {appt.id}
        </div>
        <div className="appt-detail__item">
          <strong>Status:</strong> {appt.status}
        </div>
        <div className="appt-detail__item">
          <strong>Start:</strong> {appt.start.toLocaleString()}
        </div>
        <div className="appt-detail__item">
          <strong>End:</strong> {appt.end.toLocaleString()}
        </div>
        <div className="appt-detail__item appt-detail__notes">
          <strong>Notes:</strong>
          <p>{appt.notes || "—"}</p>
        </div>
        <div className="appt-detail__item">
          <strong>Patient:</strong> {appt.patientName}
        </div>
        <div className="appt-detail__item">
          <strong>Doctor:</strong> {appt.doctorName}
        </div>
        <div className="appt-detail__item">
          <strong>Created:</strong> {appt.createdAt.toLocaleString()}
        </div>
        <div className="appt-detail__item">
          <strong>Updated:</strong> {appt.updatedAt.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;
