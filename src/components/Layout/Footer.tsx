import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/toastSlice";

const Footer: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      showToast({
        message: `Thank you for your subscription.`,
        type: "success",
      })
    );
    e.currentTarget.reset();
  };

  return (
    <footer className={styles.footerSection}>
      <div className={styles.container}>
        <div className={styles.brandSection}>
          <Link to="/" className={styles.logoLink}>
            <h1>Flightly</h1>
          </Link>
          <p className={styles.description}>
            Making air travel accessible, affordable, and enjoyable for
            everyone. Discover new destinations with Flightly.
          </p>
        </div>
        <div className={styles.linksSection}>
          <div>
            <p className={styles.title}>Company</p>
            <ul className={styles.list}>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/">Careers</Link>
              </li>
              <li>
                <Link to="/">Blog</Link>
              </li>
              <li>
                <Link to="/">Press</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={styles.title}>Support</p>
            <ul className={styles.list}>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/">FAQs</Link>
              </li>
              <li>
                <Link to="/">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={styles.title}>Destinations</p>
            <ul className={styles.list}>
              <li>
                <Link to="/">Europe</Link>
              </li>
              <li>
                <Link to="/">Asia</Link>
              </li>
              <li>
                <Link to="/">America</Link>
              </li>
              <li>
                <Link to="/">Africa</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.subscribeSection}>
          <p className={styles.title}>Subscribe to Our Newsletter</p>
          <p className={styles.subscribeDescription}>
            Get the latest updates and offers.
          </p>
          <form className={styles.form} onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.input}
            />
            <button type="submit" className={styles.subscribeButton}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className={styles.bottomSection}>
        &copy; {new Date().getFullYear()} Flightly. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
