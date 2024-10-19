import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const LogoutComponent = () => {
    const [open, setOpen] = useState(false); // State to control dialog visibility
    const navigate = useNavigate();

    // Function to handle actual logout
    const handleLogout = () => {
        // Clear sessionStorage and localStorage
        sessionStorage.clear(); // Clears all sessionStorage data
        localStorage.clear(); // Clears all localStorage data

        console.log('All storage cleared. Logging out...');

        // Redirect to login page
        navigate('/login');
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
        <div>
            <h1>Logout</h1>
            <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
                Confirm Logout
            </Button>

            {/* Confirmation Dialog */}
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
            >
                <DialogTitle id="logout-dialog-title">Logout Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="logout-dialog-description">
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        No
                    </Button>
                    <Button onClick={handleLogout} color="secondary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LogoutComponent;
