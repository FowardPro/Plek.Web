import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

// Importing images directly from the components folder
const image1 = require('./image1.png');
const image2 = require('./image2.png');
const image3 = require('./image3.png');
const image4 = require('./image4.png');

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          {/* Right-aligned Links */}
          <ul className={styles.navLinks}>
            <li className={styles.navItem}><Link to="/">HOME</Link></li>
            <li className={styles.navItem}><Link to="/about">ABOUT US</Link></li>
            <li className={styles.navItem}><Link to="/contact">CONTACT</Link></li>
            <li className={styles.navItem}><Link to="/events">EVENTS</Link></li>
          </ul>

          {/* Right-aligned Buttons */}
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
        <div className={styles.facilities}>
          <div className={styles.facilityCard}>
            <img src={image1} alt="Pretoria National Gardens" className={styles.facilityImage1} />
            <h3>Pretoria National Gardens</h3>
            <p>R90.00</p>
            <p>Description goes here</p>
            <Link to="/facility-details" className={styles.readMore}>READ MORE</Link>
          </div>
          <div className={styles.facilityCard}>
            <img src={image2} alt="Union Building" className={styles.facilityImage2} />
            <h3>Union Building</h3>
            <p>R90.00</p>
            <p>Description goes here</p>
            <Link to="/facility-details" className={styles.readMore}>READ MORE</Link>
          </div>
          <div className={styles.facilityCard}>
            <img src={image3} alt="Voortrekker Monument" className={styles.facilityImage3} />
            <h3>Voortrekker Monument</h3>
            <p>R275.00</p>
            <p>Description goes here</p>
            <Link to="/facility-details" className={styles.readMore}>READ MORE</Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <img src={image4} alt="About Us" className={styles.aboutImage} />
          <div className={styles.aboutText}>
            <h2>About Us</h2>
            <p>Welcome to the official Recreational, Cultural, Heritage, and Museum Facilities Booking App, a digital platform brought to you by the [Government Entity or Department]. We are committed to making South Africa’s rich cultural, historical, and recreational resources accessible to all citizens and visitors alike.</p>
            <p>Our app is designed to streamline the booking process for a variety of facilities across the country, from local parks and recreational centers to national heritage sites and museums. Whether you're planning a family day out, organizing an educational trip, or hosting a cultural event, this platform connects you with a wide range of facilities at your fingertips.</p>
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
