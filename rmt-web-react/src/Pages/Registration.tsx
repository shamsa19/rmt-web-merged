import React, { useState } from "react";
import { Link } from "react-router-dom";

import RmtsLogo from "../assets/RMTS.jpeg";

// Reusable components
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import DoctorFields from "../components/DoctorFields";
import Alert from "../components/Alert";

const Registration: React.FC = () => {
  // --- State Management ---
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // --- Handle Registration ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (
      !email ||
      !password ||
      !role ||
      !gender ||
      !age ||
      !nationality ||
      !fullName ||
      !birthDate ||
      !phonenumber
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (role.toLowerCase() === "doctor") {
      if (!licenseNumber || !description || !nationalId) {
        setError("Please fill in all required doctor-specific fields.");
        return;
      }
    }

    // Build payload
    const payload: any = {
      email,
      password,
      role,
      gender,
      age,
      nationality,
      fullName,
      birthDate,
      phonenumber,
    };

    if (role.toLowerCase() === "doctor") {
      payload.licenseNumber = licenseNumber;
      payload.description = description;
      payload.nationalId = nationalId;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Registration successful.");
        console.log("Registration successful:", data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Registration failed.");
      }
    } catch (err: any) {
      setError(err.message || "Error connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Column (Image) */}
      <div className="md:w-1/2 flex items-center justify-center bg-white">
        <img
          src={RmtsLogo}
          alt="RMTS Logo"
          className="max-w-full h-auto p-4 md:p-8"
        />
      </div>

      {/* Right Column (Form) */}
      <div className="md:w-1/2 flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
            Create your account
          </h2>

          {/* Error/Success Messages */}
          {error && <Alert type="error" message={error} />}
          {message && <Alert type="success" message={message} />}

          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                label="Email address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* Role */}
              <SelectField
                label="Role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  { label: "Select role", value: "" },
                  { label: "User", value: "user" },
                  { label: "Doctor", value: "doctor" },
                  { label: "Secretary", value: "secertary" },
                ]}
                required
              />

              {/* Gender & Age */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
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
                <TextField
                  label="Age"
                  name="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>

              {/* Nationality & Birth Date */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <TextField
                  label="Nationality"
                  name="nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  required
                />
                <TextField
                  label="Birth Date"
                  name="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />
              </div>

              {/* Phone Number */}
              <TextField
                label="Phone Number"
                name="phonenumber"
                type="tel"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                required
              />

              {/* Doctor-Specific Fields */}
              {role.toLowerCase() === "doctor" && (
                <DoctorFields
                  licenseNumber={licenseNumber}
                  setLicenseNumber={setLicenseNumber}
                  nationalId={nationalId}
                  setNationalId={setNationalId}
                  description={description}
                  setDescription={setDescription}
                />
              )}

              {/* Register Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border 
                    border-transparent rounded-md shadow-sm text-sm 
                    font-medium text-white bg-blue-600 hover:bg-blue-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-blue-500"
                >
                  Register
                </button>
              </div>

              {/* Already have an account? */}
              <div className="text-sm text-center">
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
