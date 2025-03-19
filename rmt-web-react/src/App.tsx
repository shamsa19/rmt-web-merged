import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Dashboard from "./Pages/dashboard";
import CreatePatient from "./Pages/CreatePatient";
import PatientsList from "./Pages/PatientsList";
import CreateGlove from "./Pages/CreateGlove";
import AssignGlove from "./Pages/AssignGlove";
import Appointments from "./Pages/Appointments";
import Layout from "./components/Layout"; // Import the Layout component

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Routes that need the sidebar and header */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-patient" element={<CreatePatient />} />
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/create-glove" element={<CreateGlove />} />
          <Route path="/assign-glove" element={<AssignGlove />} />
          <Route path="/appointments" element={<Appointments />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
