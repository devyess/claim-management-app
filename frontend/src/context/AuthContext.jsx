import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [patientAuth, setPatientAuth] = useState(null);
  const [insurerAuth, setInsurerAuth] = useState(null);

  useEffect(() => {
    const storedPatientToken = localStorage.getItem('patientAuthToken');
    if (storedPatientToken) {
      setPatientAuth(storedPatientToken);
    }
    const storedInsurerToken = localStorage.getItem('insurerAuthToken');
    if (storedInsurerToken) {
      setInsurerAuth(storedInsurerToken);
    }
  }, []);

  const patientLogin = (patientToken) => {
    setPatientAuth(patientToken);
    localStorage.setItem('patientAuthToken', patientToken);
  };

  const patientLogout = () => {
    setPatientAuth(null);
    localStorage.removeItem('patientAuthToken');
  };

  const insurerLogin = (insurerToken) => {
    setInsurerAuth(insurerToken);
    localStorage.setItem('insurerAuthToken', insurerToken);
  };
  const insurerLogout = () => {
    setInsurerAuth(null);
    localStorage.removeItem('insurerAuthToken');
  };

  return (
    <AuthContext.Provider value={{insurerAuth ,insurerLogout,patientAuth, patientLogin, patientLogout, insurerLogin }}>
      {children}
    </AuthContext.Provider>
  );
};