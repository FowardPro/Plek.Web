import React, { useState } from 'react';
import styles from './PatronDashboard.module.css';
import Chatbot from './Chatbot';  // Import the Chatbot component

const PatronDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false); // New state for purchase confirmation
  const [showCategories, setShowCategories] = useState(false); // New state for showing categories

  const handleBookNowClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPurchaseComplete(false); // Reset on modal close
  };

  const handlePurchase = () => {
    setPurchaseComplete(true); // Trigger purchase confirmation
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className={styles.patronDashboard}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.logo}>Plek</div>
        <nav className={styles.nav}>
          <ul>
            <li className={styles.navItem}>For You</li>
            <li className={styles.navItem}>Booking History</li>
            <li className={styles.navItem} onClick={toggleCategories}>
              Categories
            </li>
            {showCategories && (
              <ul className={styles.dropdownMenu}>
                <li className={styles.dropdownItem}>Museums</li>
                <li className={styles.dropdownItem}>Parks</li>
                <li className={styles.dropdownItem}>Theaters</li>
                <li className={styles.dropdownItem}>Art Galleries</li>
                <li className={styles.dropdownItem}>Cultural Centers</li>
                <li className={styles.dropdownItem}>Reserves</li>
                <li className={styles.dropdownItem}>Miscellaneous</li>
              </ul>
            )}
            <li className={styles.navItem}>Contact</li>
          </ul>
        </nav>
        <div className={styles.profileIcon}></div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1>Explore the City of Tshwane</h1>
          <p>Unlock access to the best recreational, cultural, heritage, and museum facilities across the country.</p>
        </div>
      </section>

      {/* Facilities Section */}
      <section className={styles.facilitiesSection}>
        <h2>Facilities</h2>
        <div className={styles.facilitiesCards}>
          <div className={styles.card}>
            <div className={styles.blackPlaceholder}></div>
            <h3>Pretoria National Gardens</h3>
            <p>R90.00</p>
            <p>Description goes here</p>
            <button className={styles.bookNowBtn} onClick={handleBookNowClick}>Book Now</button>
          </div>
          <div className={styles.card}>
            <div className={styles.blackPlaceholder}></div>
            <h3>Union Building</h3>
            <p>R90.00</p>
            <p>Description goes here</p>
            <button className={styles.bookNowBtn} onClick={handleBookNowClick}>Book Now</button>
          </div>
          <div className={styles.card}>
            <div className={styles.blackPlaceholder}></div>
            <h3>Voortrekker Monument</h3>
            <p>R275.00</p>
            <p>Description goes here</p>
            <button className={styles.bookNowBtn} onClick={handleBookNowClick}>Book Now</button>
          </div>
        </div>
        <button className={styles.viewMore}>View More</button>
      </section>

      {/* Events Section */}
      <section className={styles.eventsSection}>
        <h2>Events</h2>
        <div className={styles.eventCards}>
          <div className={styles.card}>
            <div className={styles.blackPlaceholder}></div>
            <h3>African Print Authors And Poetry 5th Annual</h3>
            <p>30 Nov 2024</p>
            <p>From R100 to R200</p>
            <button className={styles.bookNowBtn} onClick={handleBookNowClick}>Get Ticket</button>
          </div>
          <div className={styles.card}>
            <div className={styles.blackPlaceholder}></div>
            <h3>Music Festival Tshwane 2024</h3>
            <p>15 Dec 2024</p>
            <p>From R250 to R500</p>
            <button className={styles.bookNowBtn} onClick={handleBookNowClick}>Get Ticket</button>
          </div>
        </div>
      </section>

      {/* Modal for Booking */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>X</button>
            {!purchaseComplete ? (
              <>
                <h2>Select Payment Method</h2>
                <div className={styles.paymentMethods}>
                  <button className={styles.creditCard}>Credit Card</button>
                  <button className={styles.paypal}>PayPal</button>
                </div>
                <form className={styles.paymentForm}>
                  <input type="text" placeholder="Name on Card" />
                  <input type="text" placeholder="Card Number" />
                  <div className={styles.cardDetails}>
                    <input type="text" placeholder="Month" />
                    <input type="text" placeholder="Year" />
                    <input type="text" placeholder="CVV" />
                  </div>
                </form>
                <div className={styles.orderSummary}>
                  <h3>Order Summary</h3>
                  <p>Ditsong Kruger Museum (ADULT)</p>
                  <p>R45</p>
                  <p>Wednesday, 24 October 2024 | 11:00 AM</p>
                  <button className={styles.purchaseBtn} onClick={handlePurchase}>Purchase Now</button>
                </div>
              </>
            ) : (
              <div className={styles.confirmationMessage}>
                <h2>You've saved your ticket</h2>
                <p>An email with a link to this site has just been sent in case you ever need to make a claim</p>
                <button className={styles.claimBtn}>File a claim for this product</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chatbot Section */}
      <Chatbot /> {/* Chatbot is included here */}
    </div>
  );
};

export default PatronDashboard;
