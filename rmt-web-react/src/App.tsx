import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Dashboard from "./Pages/dashboard";
import CreatePatient from "./Pages/CreatePatient";
import CreateGlove from "./Pages/CreateGlove";
import AssignGlove from "./Pages/AssignGlove";
import Appointments from "./Pages/Appointments";
import UsersPage from "./Pages/UsersPage";
import AssignCreate from "./Pages/AssignCreate";
import Layout from "./components/Layout"; // Import the Layout component
import PatientDetail from "./components/PatientDetail";
import ReportDetail from "./components/ReportDetail"; // Import the ReportDetail component
import AppointmentDetail from "./components/AppointmentDetail"; // Import the AppointmentDetail component

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
          <Route path="/patients" element={<UsersPage />} />{" "}
          {/* Changed to UsersPage PatientsList*/}
          <Route path="/create-glove" element={<CreateGlove />} />
          <Route path="/assign-glove" element={<AssignGlove />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/AssignCreate" element={<AssignCreate />} />
          <Route path="/patients/:patientId" element={<PatientDetail />} />{" "}
          {/* Patient detail route */}
          // In your App or Routes file
          <Route
            path="/patients/:patientId/reports/:reportId"
            element={<ReportDetail />}
          />
          <Route
            path="/appointments/:appointmentId"
            element={<AppointmentDetail />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
