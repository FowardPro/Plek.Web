import React, { useState } from 'react';
import styles from './Signup.module.css';

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Creating account with:', { fname, lname, gender, age, email, phone });
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

          <button type="submit" className={styles.signupButtonSubmit}>Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
