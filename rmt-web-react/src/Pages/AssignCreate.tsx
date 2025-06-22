import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import styles from "../CSS/AssignCreate.module.css";
import Switch from "../components/Switch"; // Import the Switch component

interface Patient {
  id: string;
  fullName?: string;
}
interface Glove {
  id: string;
  model?: string;
  status?: string;
}

const AssignCreate: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [gloves, setGloves] = useState<Glove[]>([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedGlove, setSelectedGlove] = useState("");
  const [model, setModel] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [status, setStatus] = useState("");
  const [version, setVersion] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isAssignMode, setIsAssignMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("http://localhost:5000/showPatients");
        if (!res.ok) throw new Error("Failed to fetch patients");
        setPatients(await res.json());
      } catch (e: any) {
        setError(e.message);
      }
    };
    const fetchGloves = async () => {
      try {
        const res = await fetch("http://localhost:5000/showGloves");
        if (!res.ok) throw new Error("Failed to fetch gloves");
        setGloves(await res.json());
      } catch (e: any) {
        setError(e.message);
      }
    };
    fetchPatients();
    fetchGloves();
  }, []);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!selectedPatient || !selectedGlove) {
      setError("Please select both a patient and a glove.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/gloves/assign", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gloveId: selectedGlove,
          patientId: selectedPatient,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Assignment failed.");
      }
      const data = await res.json();
      setMessage(`Glove assigned successfully! Glove ID: ${data.gloveId}`);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!model || !productionDate || !status || !version) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/gloves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, productionDate, status, version }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Glove creation failed.");
      }
      const data = await res.json();
      setMessage(`Glove created successfully! ID: ${data.gloveId}`);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {isAssignMode ? "Assign Glove to Patient" : "Create New Glove"}
      </h1>

      <div className={styles.modeToggle}>
        <Switch
          checked={isAssignMode}
          onChange={() => {
            setError("");
            setMessage("");
            setIsAssignMode((m) => !m);
          }}
        />
      </div>
      {error && (
        <div className={styles.alertError}>
          <Alert type="error" message={error} />
        </div>
      )}
      {message && (
        <div className={styles.alertSuccess}>
          <Alert type="success" message={message} />
        </div>
      )}

      <form
        onSubmit={isAssignMode ? handleAssign : handleCreate}
        className={styles.formContainer}
      >
        {isAssignMode ? (
          <>
            <div className={styles.formField}>
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
            </div>
            <div className={styles.formField}>
              <SelectField
                label="Select Glove"
                name="glove"
                value={selectedGlove}
                onChange={(e) => setSelectedGlove(e.target.value)}
                options={[
                  { label: "Select glove", value: "" },
                  ...gloves.map((g) => ({
                    label: g.model ? `${g.model} — ${g.status}` : g.id,
                    value: g.id,
                  })),
                ]}
                required
              />
            </div>
            <div className={styles.assignBtnContainer}>
              <button type="submit" className={styles.assignBtn}>
                Assign
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.formField}>
              <TextField
                label="Model"
                name="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>
            <div className={styles.formField}>
              <TextField
                label="Production Date"
                name="productionDate"
                type="date"
                value={productionDate}
                onChange={(e) => setProductionDate(e.target.value)}
                required
              />
            </div>
            <div className={styles.formField}>
              <SelectField
                label="Status"
                name="status"
                labelClassName="inputLabel"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={[
                  { label: "Select status", value: "" },
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                  { label: "Maintenance", value: "maintenance" },
                ]}
                required
              />
            </div>
            <div className={styles.formField}>
              <TextField
                label="Version"
                name="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                required
              />
            </div>
            <div className={styles.createBtnContainer}>
              <button type="submit" className={styles.createBtn}>
                Create Glove
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AssignCreate;
