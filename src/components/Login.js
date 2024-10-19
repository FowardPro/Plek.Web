import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages

    console.log('Login attempt with:', { email, password }); // Log login attempt

    try {
      const response = await fetch('https://localhost:7008/api/Login/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log('API response:', data); // Log the API response

      if (data.success) {
        const { role } = data;

        console.log('Login successful. Role:', role); // Log the role

        // Case-insensitive role comparison
        if (role.toLowerCase() === 'admin') {
          console.log('Navigating to Admin Dashboard');
          navigate('/admin-dashboard');
        } else if (role.toLowerCase() === 'patron') {
          console.log('Navigating to Patron Dashboard');
          navigate('/patron-dashboard');
        } else {
          console.error('Unexpected role:', role);
          setError('Unexpected role returned by the system.');
        }

        // Pass the role and user info back to the parent component if needed
        onLogin(data.role);
      } else {
        console.log('Login failed. Incorrect email or password.');
        setError('Incorrect email or password.');
      }
    } catch (err) {
      console.error('Error during login:', err); // Log any error during the API call
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginFormWrapper}>
        <h2 className={styles.loginTitle}>Log In</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroupLogin}>
            <label htmlFor="email" className={styles.inputLabelLogin}>Email:</label>
            <input
              type="email"
              id="email"
              className={styles.inputFieldLogin}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroupLogin}>
            <label htmlFor="password" className={styles.inputLabelLogin}>Password:</label>
            <input
              type="password"
              id="password"
              className={styles.inputFieldLogin}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.loginButtonSubmit}>Log In</button>
        </form>

        <p className={styles.noAccountText}>
          Don't have an account? <Link to="/signup" className={styles.signupLinkLogin}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
