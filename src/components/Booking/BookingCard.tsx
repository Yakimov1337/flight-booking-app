import React from 'react';
import { Booking } from '../../types/booking'; // Adjust the path if needed
import styles from './BookingCard.module.css';
import planeImage from '../../assets/plane.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlane, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

interface BookingCardProps {
  booking: Booking;
  onDelete: (id: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onDelete }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  return (
    <div className={styles.bookingCard}>
      <div className={styles.header}>
        <div className={styles.bookingId}>ID: {booking.id}</div>
      </div>
      <img src={planeImage} alt="Plane" className={styles.planeImage} />
      <div className={styles.cardContent}>
        <div className={styles.nameSection}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <p>First Name:</p>
          <span>{booking.firstName}</span>
        </div>
        <div className={styles.nameSection}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <p>Last Name:</p>
          <span>{booking.lastName}</span>
        </div>
        <p className={styles.tripInfo}>
          <FontAwesomeIcon icon={faPlane} className={styles.icon} />
          <strong>Trip:</strong> {booking.departureAirportId} to {booking.arrivalAirportId}
        </p>
        <p className={styles.dateInfo}>
          <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
          <strong>Dates:</strong> {formatDate(booking.departureDate)} - {formatDate(booking.returnDate)}
        </p>
      </div>
      <button onClick={() => onDelete(booking.id)} className={styles.deleteButton}>
        Delete
      </button>
    </div>
  );
};

export default BookingCard;
