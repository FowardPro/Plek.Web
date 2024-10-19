import React from 'react';
import styles from './AdminHeader.module.css';
import { FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ adminEmail }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session and local storage
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>Admin Dashboard</h1>
            </div>
            <div className={styles.navItems}>
                <div className={styles.notification}>
                    <FaBell className={styles.icon} />
                </div>
                <div className={styles.profile}>
                    <FaUserCircle className={styles.icon} />
                    <span>{adminEmail || 'Admin'}</span>
                </div>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    <FaSignOutAlt className={styles.icon} /> Logout
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
