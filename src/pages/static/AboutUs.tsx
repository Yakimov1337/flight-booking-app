import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutUs.module.css';

const AboutUs: React.FC = () => {
  return (
    <section className={styles.aboutUsSection}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <h1 className={styles.heading}>About Flightly</h1>
          <p className={styles.tagline}>Your journey begins with us.</p>
          <div className={styles.content}>
            <p>
              At Flightly, we are committed to making air travel accessible, affordable, and enjoyable for everyone.
              Our innovative platform connects you with the best flights worldwide, ensuring a seamless booking experience.
            </p>
            <p>
              Founded in 2023, we have rapidly grown to become a trusted name in the travel industry. Our dedicated team works tirelessly to provide you with real-time updates, personalized recommendations, and exceptional customer service.
            </p>
            <p>
              Whether you're planning a business trip or a dream vacation, Flightly is here to help you every step of the way.
              Discover new destinations, explore different cultures, and make unforgettable memories with us.
            </p>
          </div>
          <Link to="/bookings" className={styles.exploreButton}>
            Explore Flights
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
