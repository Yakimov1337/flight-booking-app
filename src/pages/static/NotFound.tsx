import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p className={styles.text}>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className={styles.homeButton}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
