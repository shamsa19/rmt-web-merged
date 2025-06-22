// PatientDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../CSS/PatientDetail.css";

interface Appointment {
  id: string;
  dateTime: Date;
  description: string;
}

interface Report {
  id: string;
  actual?: number;
  conditionFlag?: string;
  heartRate?: number;
  predicted?: number;
  pressure?: number;
  temperature?: number;
}

interface PatientDetailData {
  id: string;
  fullName: string;
  email: string;
  phonenumber: string;
  emergencyContact: string;
  profilePictureUrl?: string;
  appointments: Appointment[];
  reports: Report[];
}

const PatientDetail: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<PatientDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!patientId) return;
    const fetchDetail = async () => {
      try {
        const resp = await fetch(
          `http://localhost:5000/showPatients/${patientId}`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (!resp.ok) throw new Error("Failed to load patient details");
        const json = await resp.json();

        // Normalize appointments
        const appointments: Appointment[] = (json.appointments || []).map(
          (a: any) => {
            let dt: Date;
            if (a.dateTime?.seconds != null) {
              dt = new Date(a.dateTime.seconds * 1000);
            } else {
              dt = new Date(a.dateTime);
            }
            return {
              id: a.id,
              dateTime: dt,
              description: a.notes || a.description || "",
            };
          }
        );

        setData({
          id: json.id,
          fullName: json.fullName,
          email: json.email,
          phonenumber: json.phonenumber,
          emergencyContact: json.emergencyContact,
          profilePictureUrl: json.profilePictureUrl,
          appointments,
          reports: json.reports || [],
        });
      } catch (e: any) {
        setError(e.message || "Error loading patient");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [patientId]);

  if (loading) return <div className="detail-loading">Loading patient...</div>;
  if (error) return <div className="detail-error">Error: {error}</div>;
  if (!data) return <div className="detail-error">No patient found.</div>;

  const {
    fullName,
    email,
    phonenumber,
    emergencyContact,
    profilePictureUrl,
    appointments,
    reports,
  } = data;

  return (
    <div className="detail-page">
      <button
        className="back-btn"
        onClick={() => navigate("//localhost:5173/patients")}
      >
        &larr; Back
      </button>

      <div className="detail-header">
        <img
          className="detail-avatar"
          src={profilePictureUrl || "/placeholder-user.png"}
          alt={fullName}
        />
        <div className="detail-info">
          <h2>{fullName}</h2>
          <p>Email: {email}</p>
          <p>Phone: {phonenumber}</p>
          <p>Emergency: {emergencyContact}</p>
        </div>
      </div>

      <section className="detail-section">
        <h3>Upcoming Appointments</h3>
        {appointments.length > 0 ? (
          <div className="appointments-list">
            {appointments.map((a) => (
              <Link
                to={`/appointments/${a.id}`}
                key={a.id}
                className="appt-card-link"
              >
                <div className="appt-card">
                  <div className="appt-icon">📅</div>
                  <div className="appt-body">
                    <p className="appt-date">{a.dateTime.toLocaleString()}</p>
                    <p className="appt-desc">{a.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </section>

      <section className="detail-section">
        <h3>Patient Reports</h3>
        {reports.length > 0 ? (
          <div className="reports-list">
            {reports.map((r) => (
              <Link
                to={`/patients/${patientId}/reports/${r.id}`}
                key={r.id}
                className="report-item"
              >
                <p>
                  <strong>Report ID:</strong> {r.id}
                </p>
                {r.conditionFlag && (
                  <p>
                    <strong>Condition:</strong> {r.conditionFlag}
                  </p>
                )}
                {r.actual !== undefined && (
                  <p>
                    <strong>Actual:</strong> {r.actual}
                  </p>
                )}
                {r.heartRate !== undefined && (
                  <p>
                    <strong>Heart Rate:</strong> {r.heartRate}
                  </p>
                )}
                {r.predicted !== undefined && (
                  <p>
                    <strong>Predicted:</strong> {r.predicted}
                  </p>
                )}
                {r.pressure !== undefined && (
                  <p>
                    <strong>Pressure:</strong> {r.pressure}
                  </p>
                )}
                {r.temperature !== undefined && (
                  <p>
                    <strong>Temperature:</strong> {r.temperature}
                  </p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <p>No reports available.</p>
        )}
      </section>
    </div>
  );
};

export default PatientDetail;
