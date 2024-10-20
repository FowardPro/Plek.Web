import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import styles from './SettingsComponent.module.css';

const SettingsComponent = () => {
    const [user, setUser] = useState({
        adminId: '',
        name: '',
        email: '',
        contactNo: '',
        password: ''
    });

    // Load user data from localStorage when the component mounts
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Handle input changes to update the form state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7008/api/Plack/UpdateAdmin', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const updatedUser = await response.json();

                // Update localStorage with the new user details
                localStorage.setItem('user', JSON.stringify(updatedUser));

                // Show success toast
                toast.success('Profile updated successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                const errorData = await response.json();
                // Show error toast
                toast.error(errorData.message || 'An error occurred while updating the profile.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (err) {
            // Show error toast for network or server errors
            toast.error('An error occurred while updating the profile. Please try again later.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className={styles.settingsContainer}>
            <ToastContainer /> {/* Add ToastContainer to show toasts */}
            <h1 className={styles.title}>Admin Settings</h1>
            <p className={styles.description}>Update your profile information below:</p>

            <form className={styles.settingsForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="adminId" className={styles.label}>Admin ID (read-only):</label>
                    <input
                        type="text"
                        id="adminId"
                        name="adminId"
                        value={user.adminId}
                        readOnly
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="contactNo" className={styles.label}>Contact Number:</label>
                    <input
                        type="text"
                        id="contactNo"
                        name="contactNo"
                        value={user.contactNo}
                        onChange={handleInputChange}
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        className={styles.inputField}
                    />
                </div>

                <button type="submit" className={styles.submitButton}>Update Profile</button>
            </form>
        </div>
    );
};

export default SettingsComponent;
