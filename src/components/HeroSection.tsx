import React from "react";
import styles from "./HeroSection.module.css";
import BookingForm from "./Booking/BookingForm";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1>Book Your Next Adventure Today!</h1>
        <p className={styles.heroDescription}>
          Ready to explore the world? Whether it's a weekend getaway, a family vacation, or a business trip, we've got you covered.
        </p>
        <div className={styles.buttonContainer}>
          <Link to="/bookings" className={styles.exploreButton}>
            Explore
          </Link>
          <Link to="/contact" className={styles.contactButton}>
            Contact us
          </Link>
        </div>
      </div>
      <div className={styles.searchForm}>
        <BookingForm />
      </div>
    </div>
  );
};

export default HeroSection;
