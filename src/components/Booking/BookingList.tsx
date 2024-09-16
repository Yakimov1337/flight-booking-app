import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  removeBooking,
  appendBookings,
  incrementPage,
  setLoading,
} from "../../redux/bookingSlice";
import { fetchBookings, deleteBooking } from "../../api/api";
import { Booking } from "../../types/booking";
import styles from "./BookingList.module.css";
import { Link } from "react-router-dom";
import Loader from "../shared/Loader";
import BookingCard from "./BookingCard";
import DeleteModal from "../shared/DeleteModal"; 
import { openModal, closeModal } from "../../redux/modalSlice";
import { showToast } from "../../redux/toastSlice";

const BookingList: React.FC = () => {
  const { bookings, page, loading, totalCount } = useSelector(
    (state: RootState) => state.bookings
  );
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  // Refs to hold the latest state values
  const loadingRef = useRef(loading);
  const bookingsLengthRef = useRef(bookings.length);
  const totalCountRef = useRef(totalCount);

  // Update refs when state changes
  useEffect(() => {
    loadingRef.current = loading;
    bookingsLengthRef.current = bookings.length;
    totalCountRef.current = totalCount;
  }, [loading, bookings.length, totalCount]);

  const displayBookings = useCallback(() => {
    if (loadingRef.current) return; // Prevent unnecessary fetch
    dispatch(setLoading(true));
    setError(null);

    setTimeout(async () => {
      try {
        const fetchedBookings = await fetchBookings(page);
        dispatch(appendBookings(fetchedBookings));
      } catch (err) {
        setError("Failed to fetch bookings.");
      } finally {
        dispatch(setLoading(false));
      }
    }, 2000); // Delay the fetch by 2000ms
  }, [dispatch, page]);

  useEffect(() => {
    displayBookings();
  }, [displayBookings]);

  const handleDeleteClick = (id: string) => {
    setSelectedBookingId(id);
    dispatch(openModal(id)); // Open modal with the selected booking ID
  };

  const handleConfirmDelete = async () => {
    if (selectedBookingId) {
      try {
        await deleteBooking(selectedBookingId);
        dispatch(removeBooking(selectedBookingId));
        dispatch(showToast({ message: `Booking ${selectedBookingId} was deleted successfully`, type: "success" }));
      } catch (err) {
        dispatch(showToast({ message: "Failed to delete booking", type: "error" }));
      } finally {
        dispatch(closeModal());
      }
    }
  };

  // add observer and re-attach it whenever new content is loaded
  useEffect(() => {
    if (observer.current) observer.current.disconnect(); // remove any existing observer

    observer.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !loadingRef.current &&
          bookingsLengthRef.current < totalCountRef.current
        ) {
          dispatch(incrementPage());
        }
      },
      {
        rootMargin: "0px 0px 50px 0px", // trigger slightly before the element comes into view
        threshold: 0.1, // trigger when 10% of the element is visible
      }
    );

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [dispatch, bookings.length]); // re-run this effect when the bookings change

  return (
    <div className={styles.bookingListContainer}>
      <div className={styles.header}>
        <h3>Booking List</h3>
        <Link to="/bookings" className={styles.exploreLink}>
          Explore All <span className={styles.arrow}>&rarr;</span>
        </Link>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.cardsContainer}>
        {bookings.map((booking: Booking, index: number) => {
          const animationDelay = (index % 3) * 0.2; // Reset every 3 items
          return (
            <div
              key={booking.id}
              className={styles.cardWrapper}
              style={{ animationDelay: `${animationDelay}s` }}
            >
              <BookingCard booking={booking} onDelete={() => handleDeleteClick(booking.id)} /> 
            </div>
          );
        })}
      </div>

      {loading && <Loader />}
      <div ref={lastElementRef} style={{ height: "1px" }} />
      <DeleteModal onConfirm={handleConfirmDelete} /> 
    </div>
  );
};

export default BookingList;
