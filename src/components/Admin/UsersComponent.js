import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material'; // Import the Add icon from Material UI
import styles from './UsersComponent.module.css'; // Import the CSS module

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state
  const [newUser, setNewUser] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
  });

  // Fetch users from API when component loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://localhost:7008/api/Plack/GetAllPatrons');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Generate a random password with at least 1 digit, 1 special character, and 6 characters long
  const generatePassword = () => {
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specialCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const passwordArray = [];
    passwordArray.push(lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]);
    passwordArray.push(uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]);
    passwordArray.push(digits[Math.floor(Math.random() * digits.length)]);
    passwordArray.push(specialCharacters[Math.floor(Math.random() * specialCharacters.length)]);

    const allCharacters = lowercaseLetters + uppercaseLetters + digits + specialCharacters;
    for (let i = 0; i < 4; i++) {
      passwordArray.push(allCharacters[Math.floor(Math.random() * allCharacters.length)]);
    }

    return passwordArray.sort(() => Math.random() - 0.5).join('');
  };

  const handleAddUser = async () => {
    try {
      const generatedPassword = generatePassword();
      const newUserWithPassword = { ...newUser, password: generatedPassword };

      // Post new user to the API
      const response = await axios.post('https://localhost:7008/api/Plack/AddPatron', newUserWithPassword);

      // Send email
      await axios.post('https://localhost:7008/api/Email/send', {
        email: newUserWithPassword.email,
        subject: 'Your Account Credentials',
        message: `
                    Hi ${newUserWithPassword.fName},
                    Your account has been created. Your credentials are as follows:
                    Email: ${newUserWithPassword.email}
                    Password: ${generatedPassword}
                    Please log in and change your password.
                `,
      });

      // Add new user to the state
      setUsers([...users, response.data]);
      setIsDialogOpen(false); // Close dialog after adding the user
    } catch (error) {
      console.error('Error adding user or sending email:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Manage Users</h1>

      {/* Add User button with an Add icon */}
      <div className={styles.buttonGroup}> {/* Ensures button is above the table */}
        <Button
          onClick={() => setIsDialogOpen(true)}
          startIcon={<Add />} // Add icon
          variant="contained"
          sx={{ backgroundColor: '#4CAF50', color: 'white' }} // Green button with white text
        >
          Add User
        </Button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Patron ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.patronId}>
                <td>{user.patronId}</td>
                <td>{user.fName}</td>
                <td>{user.lName}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.emptyMessage}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Dialog for adding a new user */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="fName"
            value={newUser.fName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lName"
            value={newUser.lName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddUser}>Add User</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersComponent;
