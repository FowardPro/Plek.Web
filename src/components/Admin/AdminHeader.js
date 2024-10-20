import React, { useState, useEffect } from 'react';
import { FaBell, FaUserCircle, FaSignOutAlt, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import styles from './AdminHeader.module.css';

const AdminHeader = () => {
    const [open, setOpen] = useState(false); // State to control dialog visibility
    const [adminEmail, setAdminEmail] = useState(''); // State to store admin email
    const navigate = useNavigate();

    // Load email from localStorage when the component mounts
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email) {
            setAdminEmail(storedUser.email);
        } else {
            setAdminEmail('No Email Available');
        }
    }, []);

    // Function to handle actual logout
    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login'); // Redirect to login page
    };

    // Open the dialog
    const handleOpenDialog = () => {
        setOpen(true);
    };

    // Close the dialog
    const handleCloseDialog = () => {
        setOpen(false);
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
                    <span className={styles.adminText}>Admin</span>
                    <span className={styles.emailText}>{adminEmail}</span> {/* Display the email */}
                </div>
                <button className={styles.logoutButton} onClick={handleOpenDialog}>
                    <FaSignOutAlt className={styles.logoutIcon} /> Logout
                </button>
            </div>

            {/* Enhanced Logout Confirmation Dialog */}
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
                className={styles.dialog}
            >
                <DialogTitle id="logout-dialog-title" className={styles.dialogTitle}>
                    <FaExclamationCircle className={styles.confirmationIcon} />
                    Logout Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="logout-dialog-description" className={styles.dialogContentText}>
                        Are you sure you want to log out? You will need to log in again to access the admin dashboard.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={styles.dialogActions}>
                    <Button onClick={handleCloseDialog} variant="contained" className={styles.cancelButton}>
                        No
                    </Button>
                    <Button onClick={handleLogout} variant="contained" color="secondary" className={styles.confirmButton} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </header>
    );
};

export default AdminHeader;
