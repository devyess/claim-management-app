import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PatientLogin from './components/patients/Login';
import InsurerLogin from './components/insurers/Login';
import PatientRegister from './components/patients/Register';
import InsurerRegister from './components/insurers/Register';
import PatientDashboard from './components/patients/Dashboard';
import InsurerDashboard from './components/insurers/Dashboard';
import CreateClaim from './components/patients/CreateClaim';
import EditClaim from './components/insurers/EditClaim'; 
import MainScreen from './components/MainScreen'
function App() {
  return (
    <Router>
      <div >
        <Routes>
          <Route path="/patients/login" element={<PatientLogin />} />
          <Route path="/insurers/login" element={<InsurerLogin />} />
          <Route path="/patients/register" element={<PatientRegister />} />
          <Route path="/insurers/register" element={<InsurerRegister />} />
          <Route path="/patients/dashboard" element={<PatientDashboard />} />
          <Route path="/insurers/dashboard" element={<InsurerDashboard />} />
          <Route path="/patients/createClaim" element={<CreateClaim />} />
          <Route path="/claims/edit/:id" element={<EditClaim />} /> {/* Add this route */}
          <Route path="/" element={<MainScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;