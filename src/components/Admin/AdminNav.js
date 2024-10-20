import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminNav.module.css';

// Importing icons from react-icons
import { FaTachometerAlt, FaUsers, FaBuilding, FaFileAlt, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';

const AdminNav = () => {
    const [isTextHidden, setIsTextHidden] = useState(false);

    // Toggle the state to hide/show text and resize the nav
    const toggleNav = () => {
        setIsTextHidden(!isTextHidden);
    };

    return (
        <nav className={`${styles.adminNav} ${isTextHidden ? styles.collapsed : ''}`}>
            {/* Toggle button to hide/show the text */}
            <button onClick={toggleNav} className={styles.toggleButton}>
                <FaBars />
            </button>

            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <NavLink
                        to="/admin-dashboard/dashboard"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        <FaTachometerAlt className={styles.icon} />
                        {!isTextHidden && <span>Dashboard</span>} {/* Conditionally render text */}
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink
                        to="/admin-dashboard/users"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        <FaUsers className={styles.icon} />
                        {!isTextHidden && <span>Users</span>} {/* Conditionally render text */}
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink
                        to="/admin-dashboard/facilities"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        <FaBuilding className={styles.icon} />
                        {!isTextHidden && <span>Facilities</span>} {/* Conditionally render text */}
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink
                        to="/admin-dashboard/reports"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        <FaFileAlt className={styles.icon} />
                        {!isTextHidden && <span>Reports</span>} {/* Conditionally render text */}
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink
                        to="/admin-dashboard/settings"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        <FaCog className={styles.icon} />
                        {!isTextHidden && <span>Settings</span>} {/* Conditionally render text */}
                    </NavLink>
                </li>
                <li className={styles.navItem}>
                    <NavLink
                        to="/admin-dashboard/logout"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        <FaSignOutAlt className={styles.icon} />
                        {!isTextHidden && <span>Logout</span>} {/* Conditionally render text */}
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNav;
