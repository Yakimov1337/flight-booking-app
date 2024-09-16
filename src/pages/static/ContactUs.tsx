import React from 'react';
import styles from './ContactUs.module.css';

const ContactUs: React.FC = () => {
  return (
    <section className={styles.contactUsSection}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Contact Us</h2>
          <p className={styles.paragraph}>We'd love to hear from you! Please fill out the form below.</p>
          <form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} required></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
