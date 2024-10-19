import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patron'); // Default role
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login process
    if (email && password) {
      onLogin(role); // Pass the role back to the parent App component

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'patron') {
        navigate('/patron-dashboard');
      }
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginFormWrapper}>
        <h2 className={styles.loginTitle}>Log In</h2>
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

          <div className={styles.inputGroupLogin}>
            <label htmlFor="role" className={styles.inputLabelLogin}>Log in as:</label>
            <select
              id="role"
              className={styles.inputSelectLogin}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="patron">Patron</option>
              <option value="admin">Admin</option>
            </select>
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
