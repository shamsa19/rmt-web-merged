// ReportDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../CSS/ReportDetail.css";

interface Report {
  id: string;
  Actual?: number;
  conditionFlag?: string;
  heartRate?: number;
  predicted?: number;
  pressure?: number;
  temperature?: number;
}

const ReportDetail: React.FC = () => {
  const { patientId, reportId } = useParams<{
    patientId: string;
    reportId: string;
  }>();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) {
      setError("No report ID provided");
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/reports/${reportId}`,
          { credentials: "include" }
        );
        if (!response.ok)
          throw new Error(`Failed to fetch (${response.status})`);
        const raw: any = await response.json();
        const mapped: Report = {
          id: raw.id,
          Actual: raw["Actual"],
          conditionFlag: raw["Condition Flag"],
          heartRate: raw["Heart Rate (bpm)"],
          predicted: raw["Predicted"],
          pressure: raw["Pressure (kPa)"],
          temperature: raw["Temperature (°C)"],
        };
        setReport(mapped);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [reportId]);

  if (loading)
    return <div className="report-detail__loading">Loading report...</div>;
  if (error) return <div className="report-detail__error">Error: {error}</div>;
  if (!report)
    return <div className="report-detail__empty">No report data.</div>;

  return (
    <article className="report-detail">
      <header className="report-detail__header">
        <Link to={`/patients/${patientId}`} className="report-detail__back">
          ← Back to Patient
        </Link>
        <h1 className="report-detail__title">Report ID: {report.id}</h1>
      </header>
      <section className="report-detail__stats">
        {report.conditionFlag && (
          <div className="report-detail__item">
            <strong>Condition:</strong> {report.conditionFlag}
          </div>
        )}
        {report.Actual !== undefined && (
          <div className="report-detail__item">
            <strong>Actual:</strong> {report.Actual}
          </div>
        )}
        {report.heartRate !== undefined && (
          <div className="report-detail__item">
            <strong>Heart Rate (bpm):</strong> {report.heartRate.toFixed(2)}
          </div>
        )}
        {report.predicted !== undefined && (
          <div className="report-detail__item">
            <strong>Predicted:</strong> {report.predicted}
          </div>
        )}
        {report.pressure !== undefined && (
          <div className="report-detail__item">
            <strong>Pressure (kPa):</strong> {report.pressure.toFixed(2)}
          </div>
        )}
        {report.temperature !== undefined && (
          <div className="report-detail__item">
            <strong>Temperature (°C):</strong> {report.temperature.toFixed(2)}
          </div>
        )}
      </section>
    </article>
  );
};

export default ReportDetail;
