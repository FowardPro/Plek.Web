import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminNav.module.css';

// Importing icons from react-icons
import { FaTachometerAlt, FaUsers, FaBuilding, FaFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const AdminNav = () => {
    return (
        <nav className={styles.adminNav}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <NavLink
                        to="/admin-dashboard/dashboard"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        <FaTachometerAlt className={styles.icon} /> {/* Dashboard Icon */}
                        Dashboard
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink
                        to="/admin-dashboard/users"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        <FaUsers className={styles.icon} /> {/* Users Icon */}
                        Users
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink
                        to="/admin-dashboard/facilities"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        <FaBuilding className={styles.icon} /> {/* Facilities Icon */}
                        Facilities
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink
                        to="/admin-dashboard/reports"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        <FaFileAlt className={styles.icon} /> {/* Reports Icon */}
                        Reports
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink
                        to="/admin-dashboard/settings"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        <FaCog className={styles.icon} /> {/* Settings Icon */}
                        Settings
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink
                        to="/admin-dashboard/logout"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        <FaSignOutAlt className={styles.icon} /> {/* Logout Icon */}
                        Logout
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNav;
