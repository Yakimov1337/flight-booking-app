import React, { useState, useEffect, useLayoutEffect } from "react";
import BookingCard from "./BookingCard";
import styles from "./FilteredBookingList.module.css";
import Loader from "../shared/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchBookings, deleteBooking } from "../../api/api";
import { Booking, PageableBookingList } from "../../types/booking";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "../../redux/modalSlice";
import DeleteModal from "../shared/DeleteModal";
import { removeBooking } from "../../redux/bookingSlice";
import { showToast } from "../../redux/toastSlice";

const FilteredBookingList: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      try {
        const pageableResponse: PageableBookingList = await fetchBookings(
          0,
          1000
        );
        setBookings(pageableResponse.list);
        setFilteredBookings(pageableResponse.list);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  // Debouncer to delay the search input changes
  useLayoutEffect(() => {
    if (bookings.length > 0) {
      setLoading(true);
      const debounceTimeout = setTimeout(() => {
        const filtered = bookings.filter((booking) =>
          booking.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBookings(filtered);
        setLoading(false);
      }, 300); // 300ms debounce time

      return () => clearTimeout(debounceTimeout);
    }
  }, [searchTerm, bookings]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    dispatch(openModal(bookingId));
  };

  const handleConfirmDelete = async () => {
    if (selectedBookingId) {
      try {
        await deleteBooking(selectedBookingId);
        setBookings((prev) =>
          prev.filter((booking) => booking.id !== selectedBookingId)
        );
        setFilteredBookings((prev) =>
          prev.filter((booking) => booking.id !== selectedBookingId)
        );
        dispatch(removeBooking(selectedBookingId)); // Update Redux store for consistency (home page uses redux store to show bookings)
        dispatch(
          showToast({
            message: `Booking ${selectedBookingId} was deleted successfully`,
            type: "success",
          })
        );
      } catch (err: any) {
        const errorMessage = err.message || "Failed to delete booking";
        dispatch(showToast({ message: errorMessage, type: "error" }));
      } finally {
        dispatch(closeModal());
      }
    }
  };

  return (
    <div className={styles.filteredBookingListContainer}>
      <div className={styles.searchForm}>
        <h2 className={styles.heading}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          Search Bookings
        </h2>
        <input
          type="text"
          placeholder="Search by first name"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className={styles.cardsContainer}>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onDelete={() => handleDeleteClick(booking.id)}
              />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
      <DeleteModal onConfirm={handleConfirmDelete} />
    </div>
  );
};

export default FilteredBookingList;
