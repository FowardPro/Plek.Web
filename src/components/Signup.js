import React, { useState, useEffect } from 'react';
import styles from './Signup.module.css';

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one digit.");
    }
    return errors;
  };

  // Update password validation errors whenever the password changes
  useEffect(() => {
    setPasswordErrors(validatePassword(password));

    // Check if the confirm password matches the original password
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError('');
    }
  }, [password, confirmPassword]);

  const handleSignup = (e) => {
    e.preventDefault();

    if (passwordErrors.length > 0 || confirmPasswordError) {
      // Prevent form submission if there are validation errors
      return;
    }

    console.log('Creating account with:', { fname, lname, gender, age, email, phone, password });
  };

  return (
    <div className={styles.signupPageContainer}>
      <div className={styles.signupFormWrapper}>
        <h2 className={styles.signupTitle}>Create an Account</h2>
        <form onSubmit={handleSignup}>
          <div className={styles.inputGroupSignup}>
            <label htmlFor="fname" className={styles.inputLabelSignup}>First Name:</label>
            <input
              type="text"
              id="fname"
              className={styles.inputFieldSignup}
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroupSignup}>
            <label htmlFor="lname" className={styles.inputLabelSignup}>Last Name:</label>
            <input
              type="text"
              id="lname"
              className={styles.inputFieldSignup}
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroupSignup}>
            <label htmlFor="gender" className={styles.inputLabelSignup}>Gender:</label>
            <select
              id="gender"
              className={styles.inputSelectSignup}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.inputGroupSignup}>
            <label htmlFor="age" className={styles.inputLabelSignup}>Age:</label>
            <input
              type="number"
              id="age"
              className={styles.inputFieldSignup}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroupSignup}>
            <label htmlFor="email" className={styles.inputLabelSignup}>Email:</label>
            <input
              type="email"
              id="email"
              className={styles.inputFieldSignup}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroupSignup}>
            <label htmlFor="phone" className={styles.inputLabelSignup}>Phone:</label>
            <input
              type="tel"
              id="phone"
              className={styles.inputFieldSignup}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className={styles.inputGroupSignup}>
            <label htmlFor="password" className={styles.inputLabelSignup}>Password:</label>
            <input
              type="password"
              id="password"
              className={styles.inputFieldSignup}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordErrors.length > 0 && (
              <ul className={styles.errorText}>
                {passwordErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className={styles.inputGroupSignup}>
            <label htmlFor="confirmPassword" className={styles.inputLabelSignup}>Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className={styles.inputFieldSignup}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPasswordError && <p className={styles.errorText}>{confirmPasswordError}</p>}
          </div>

          <button type="submit" className={styles.signupButtonSubmit}>Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
