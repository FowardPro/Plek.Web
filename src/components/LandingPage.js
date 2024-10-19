import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

// Importing images directly from the components folder (for hero section)
const image1 = require('./image1.png');

const LandingPage = () => {
  // State to hold the facilities fetched from the API
  const [facilities, setFacilities] = useState([]);
  const [error, setError] = useState('');

  // Fetch facilities when the component loads
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch('https://localhost:7008/api/Plack/GetAllFacilities');
        if (!response.ok) {
          throw new Error('Failed to fetch facilities');
        }
        const data = await response.json();
        setFacilities(data);
      } catch (err) {
        setError('Error loading facilities');
        console.error('Error fetching facilities:', err);
      }
    };

    fetchFacilities();
  }, []);

  return (
    <div className={styles.landingPage}>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <ul className={styles.navLinks}>
            <li className={styles.navItem}><Link to="/">HOME</Link></li>
            <li className={styles.navItem}><Link to="/about">ABOUT US</Link></li>
            <li className={styles.navItem}><Link to="/contact">CONTACT</Link></li>
            <li className={styles.navItem}><Link to="/events">EVENTS</Link></li>
          </ul>
          <div className={styles.authButtons}>
            <Link to="/signup" className={styles.signupButton}>SIGNUP</Link>
            <Link to="/login" className={styles.loginButton}>LOGIN</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <img src={image1} alt="Union Building" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h1>EXPLORE THE CITY OF TSHWANE</h1>
          <p>Unlock easy access to the best recreational, cultural, heritage, and museum facilities across the country.</p>
          <Link to="/booking" className={styles.bookButton}>BOOK NOW</Link>
        </div>
      </section>

      {/* Facilities Section */}
      <section className={styles.facilitiesSection}>
        <h2>FACILITIES</h2>

        {error && <p className={styles.error}>{error}</p>}  {/* Display error message if any */}

        <div className={styles.facilities}>
          {facilities.length === 0 ? (
            <p>Loading facilities...</p>
          ) : (
            facilities.map((facility, index) => (
              <div key={index} className={styles.facilityCard}>
                <img
                  src={`data:image/jpeg;base64,${facility.imageData}`} // Assuming the image is returned as Base64
                  alt={facility.name}
                  className={styles.facilityImage}
                />
                <h3>{facility.name}</h3>
                <p>R{facility.price.toFixed(2)}</p>
                <p>{facility.description}</p>
                <Link to={`/facility-details/${facility.facilityId}`} className={styles.readMore}>READ MORE</Link>
              </div>
            ))
          )}
        </div>
      </section>

      {/* About Us Section */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <img src={image1} alt="About Us" className={styles.aboutImage} />
          <div className={styles.aboutText}>
            <h2>About Us</h2>
            <p>Welcome to the official Recreational, Cultural, Heritage, and Museum Facilities Booking App, a digital platform brought to you by the [Government Entity or Department]. We are committed to making South Africa’s rich cultural, historical, and recreational resources accessible to all citizens and visitors alike.</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className={styles.contactSection}>
        <h2>Contact Us</h2>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message"></textarea>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
        <footer className={styles.footer}>
          <p>320 Madiba St, Pretoria Central, Pretoria, 0001</p>
          <p>(012) 358 9990 | info@plek.co.za</p>
        </footer>
      </section>
    </div>
  );
};

export default LandingPage;
