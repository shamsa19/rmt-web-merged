import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../components/TextField";
import Alert from "../components/Alert";
import "../CSS/CreatePatient.css";
import SelectField from "../components/SelectField";

const CreatePatient: React.FC = () => {
  // --- State Management ---
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // --- Handle Form Submission ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validate
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender ||
      !age ||
      !nationality ||
      !birthDate ||
      !phonenumber ||
      !emergencyContact
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const payload = {
      fullName,
      email,
      password,
      gender,
      age,
      nationality,
      birthDate,
      phonenumber,
      emergencyContact,
    };

    try {
      const response = await fetch("http://localhost:5000/createPatient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Patient account created successfully!");
        // Optionally, display a success message before navigating
        // navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Patient creation failed.");
      }
    } catch (err: any) {
      setError(err.message || "Error connecting to the server.");
    }
  };

  return (
    <div className="create-patient-page">
      <div className="CreatePatientHeader">
        <img src="../../public/user.png" alt="User" />
        Create Patient
      </div>
      <div className="CreatePatientBody">
        <form
          id="create-patient-form"
          className="form-container"
          onSubmit={handleSubmit}
        >
          {/* Row 1 */}
          <div className="inputContainer1">
            <TextField
              containerClassName="inputContainer"
              labelClassName="inputLabel"
              label="Full Name"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="inputContainer1">
            <TextField
              containerClassName="inputContainer"
              labelClassName="inputLabel"
              label="Age"
              name="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="inputContainer1">
            <TextField
              containerClassName="inputContainer"
              labelClassName="inputLabel"
              label="Nationality"
              name="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              required
            />
          </div>
          {/* Row 2 */}
          <div className="inputContainer1">
            <TextField
              containerClassName="inputContainer"
              labelClassName="inputLabel"
              label="Birth Date"
              name="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>
          <div className="inputContainer1">
            <TextField
              containerClassName="inputContainer"
              labelClassName="inputLabel"
              label="Phone Number"
              name="phonenumber"
              type="tel"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              required
            />
          </div>
          <div className="inputContainer1">
            <TextField
              containerClassName="inputContainer"
              labelClassName="inputLabel"
              label="Emergency Number"
              name="emergencyContact"
              type="tel"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              required
            />
          </div>
          {/* Row 3 */}
          <div className="inputContainer1">
            <TextField
              containerClassName="inputContainer"
              labelClassName="inputLabel"
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputContainer1">
            <TextField
              containerClassName="inputContainer"
              labelClassName="inputLabel"
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="inputContainer1">
            <TextField
              containerClassName="inputContainer"
              labelClassName="inputLabel"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {/* Row 4 */}
          <div className="inputContainer1">
            <SelectField
              containerClassName="inputContainer"
              labelClassName="inputLabel"
              label="Gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              options={[
                { label: "Select gender", value: "" },
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              required
            />
          </div>
        </form>
        <hr className="grid-divider" />

        <div className="button-container">
          <button
            type="submit"
            form="create-patient-form"
            className="CreatePatientButton"
          >
            Create Patient
          </button>
        </div>
      </div>
      {/* The form below uses a 3x3 grid layout for the 9 input fields */}

      {/* Horizontal line below the grid */}

      {error && (
        <div className="alert-popup">
          <Alert
            type="error"
            message={error}
            onDismiss={() => setError(null)}
          />
        </div>
      )}
      {message && (
        <div className="alert-popup">
          <Alert
            type="success"
            message={message}
            onDismiss={() => setMessage(null)}
          />
        </div>
      )}
    </div>
  );
};

export default CreatePatient;
