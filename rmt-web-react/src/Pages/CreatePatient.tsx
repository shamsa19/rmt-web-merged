import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";

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
  // Uncomment if you plan to use prescriptions later:
  // const [prescriptions, setPrescriptions] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // --- Handle Form Submission ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

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
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Patient creation failed.");
      }
    } catch (err: any) {
      setError(err.message || "Error connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Create Patient Account</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        {/* Display Error/Success Alerts */}
        {error && <Alert type="error" message={error} />}
        {message && <Alert type="success" message={message} />}

        {/* Full Name */}
        <TextField
          label="Full Name"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        {/* Email */}
        <TextField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Confirm Password */}
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Gender */}
        <SelectField
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

        {/* Age */}
        <TextField
          label="Age"
          name="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        {/* Nationality */}
        <TextField
          label="Nationality"
          name="nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          required
        />

        {/* Birth Date */}
        <TextField
          label="Birth Date"
          name="birthDate"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />

        {/* Phone Number */}
        <TextField
          label="Phone Number"
          name="phonenumber"
          type="tel"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          required
        />

        {/* Emergency Contact */}
        <TextField
          label="Emergency Number"
          name="emergencyContact"
          type="tel"
          value={emergencyContact}
          onChange={(e) => setEmergencyContact(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Patient
        </button>
      </form>
    </div>
  );
};

export default CreatePatient;
