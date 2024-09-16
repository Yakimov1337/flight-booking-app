import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleTheme } from "../../redux/themeSlice";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
    >
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logo}>Flightly</div>
        </Link>
        <nav className={`${styles.navigation} ${isMenuOpen ? styles.open : ""}`}>
          <ul className={styles.navLinks}>
            <li>
              <Link
                to="/"
                className={`${styles.navLink} ${
                  location.pathname === "/" ? styles.active : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`${styles.navLink} ${
                  location.pathname === "/about" ? styles.active : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`${styles.navLink} ${
                  location.pathname === "/contact" ? styles.active : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/bookings"
                className={`${styles.navLink} ${
                  location.pathname === "/bookings" ? styles.active : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Bookings
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.mobileActions}>
          <div className={styles.themeSwitcher}>
            {theme === "light" ? (
              <button
                type="button"
                className={styles.themeButton}
                onClick={() => dispatch(toggleTheme())}
              >
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
                Dark
              </button>
            ) : (
              <button
                type="button"
                className={styles.themeButton}
                onClick={() => dispatch(toggleTheme())}
              >
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
                Light
              </button>
            )}
          </div>
          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
