import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import AdminDashboard from './components/Admin/AdminDashboard';
import PatronDashboard from './Patron/PatronDashboard';
import Login from './components/Login';  // Assuming there's a login component

function App() {
  const [userRole, setUserRole] = useState(null);

  // Check if role is already stored in sessionStorage when the app loads
  useEffect(() => {
    const savedRole = sessionStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  // Handle login from login component
  const handleLogin = (role) => {
    setUserRole(role);
    sessionStorage.setItem('userRole', role); // Save role in sessionStorage
  };

  // Handle logout and clear sessionStorage
  const handleLogout = () => {
    setUserRole(null);
    sessionStorage.removeItem('userRole'); // Clear user data on logout
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Protected routes for dashboards */}
          <Route
            path="/admin-dashboard/*"
            element={userRole === 'admin' ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/patron-dashboard/*"
            element={userRole === 'patron' ? <PatronDashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
