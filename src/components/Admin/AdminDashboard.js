import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import AdminHeader from './AdminHeader';
import { Routes, Route } from 'react-router-dom';
import DashboardComponent from './DashboardComponent';
import UsersComponent from './UsersComponent';
import FacilitiesComponent from './FacilitiesComponent';
import ReportsComponent from './ReportsComponent';
import SettingsComponent from './SettingsComponent';
import LogoutComponent from './LogoutComponent';

const AdminDashboard = () => {
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.emailAddress) {
      setAdminEmail(user.emailAddress);
    }
  }, []);

  return (
    <div>
      <AdminHeader adminEmail={adminEmail} />
      <div style={{ display: 'flex', marginTop: '60px' }}> {/* Adjust for header height */}
        <AdminNav />
        <div style={{ marginLeft: '260px', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<DashboardComponent />} />
            <Route path="users" element={<UsersComponent />} />
            <Route path="facilities" element={<FacilitiesComponent />} />
            <Route path="reports" element={<ReportsComponent />} />
            <Route path="settings" element={<SettingsComponent />} />
            <Route path="logout" element={<LogoutComponent />} />
          </Routes>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
