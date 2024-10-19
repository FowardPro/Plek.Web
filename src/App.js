import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/Admin/AdminDashboard';
import PatronDashboard from './Patron/PatronDashboard';

function App() {
  const [userRole, setUserRole] = useState(null);

  // Check if role is already stored in sessionStorage
  useEffect(() => {
    const savedRole = sessionStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  const handleLogin = (role) => {
    setUserRole(role);
    sessionStorage.setItem('userRole', role); // Save role in sessionStorage
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes for dashboards */}
          <Route
            path="/admin-dashboard/*"
            element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/patron-dashboard/*"
            element={userRole === 'patron' ? <PatronDashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
