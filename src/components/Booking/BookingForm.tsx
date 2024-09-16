import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookingCreate } from "../../redux/bookingSlice";
import { fetchAirports, createBooking } from "../../api/api";
import { NewBooking } from "../../types/booking";
import { Airport } from "../../types/airport";
import styles from "./BookingForm.module.css";
import { RootState } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faPlaneArrival,
  faCalendarAlt,
  faClock,
  faUser,
  faPlaneCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../../redux/toastSlice";

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<NewBooking>({
    firstName: "",
    lastName: "",
    departureAirportId: 0,
    arrivalAirportId: 0,
    departureDate: "",
    returnDate: "",
  });
  const [airports, setAirports] = useState<Airport[]>([]);
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const loadAirports = async () => {
      const airportData = await fetchAirports();
      setAirports(airportData);
    };
    loadAirports();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(formData.returnDate) < new Date(formData.departureDate)) {
      dispatch(showToast({ message: "Return date must be after the departure date", type: "error" }));
      return;
    }


    try {
      const createdBooking = await createBooking(formData);
      dispatch(bookingCreate(createdBooking));
      dispatch(showToast({ message: "Booking created successfully", type: "success" }));
      setFormData({
        firstName: "",
        lastName: "",
        departureAirportId: 0,
        arrivalAirportId: 0,
        departureDate: "",
        returnDate: "",
      });
    } catch (error: any) {
      const errorMessage = error.message || "Failed to create booking";
      dispatch(showToast({ message: errorMessage, type: "error" }));
    }
  };
  // Function to calculate trip duration
  const calculateTripDuration = () => {
    const { departureDate, returnDate } = formData;
    if (departureDate && returnDate) {
      const departure = new Date(departureDate);
      const returnD = new Date(returnDate);
      const diffTime = Math.abs(returnD.getTime() - departure.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
      return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
    }
    return "Select Dates";
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`${styles.bookingForm} ${
          theme === "dark" ? styles.dark : ""
        }`}
      >
        <div className={styles.header}>
          <h3>Start your journey</h3>
          <FontAwesomeIcon
            icon={faPlaneCircleCheck}
            className={styles.planeIcon}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <FontAwesomeIcon icon={faPlaneDeparture} className={styles.icon} />
            <select
              name="departureAirportId"
              value={formData.departureAirportId}
              onChange={handleChange}
              required
              className={styles.input}
            >
              <option value="">From Where?</option>
              {airports.map((airport) => (
                <option key={airport.id} value={airport.id}>
                  {airport.title}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <FontAwesomeIcon icon={faPlaneArrival} className={styles.icon} />
            <select
              name="arrivalAirportId"
              value={formData.arrivalAirportId}
              onChange={handleChange}
              required
              className={styles.input}
            >
              <option value="">Where To?</option>
              {airports.map((airport) => (
                <option key={airport.id} value={airport.id}>
                  {airport.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.field} ${styles.dateField}`}>
            <label className={styles.label} htmlFor="departureDate">
              Departure Date:
            </label>
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
              <input
               id="departureDate"
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>
          <div className={`${styles.field} ${styles.dateField}`}>
            <label className={styles.label} htmlFor="returnDate">
              Return Date:
            </label>
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
              <input
              id="returnDate"
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                required
                className={styles.input}
                min={formData.departureDate} // Set minimum date for returnDate to departureDate
              />
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Duration:</label>
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon icon={faClock} className={styles.icon} />
              <span className={`${styles.input} ${styles.durationSpan}`}>
                {calculateTripDuration()}
              </span>
            </div>
          </div>
        </div>
        <button type="submit" className={styles.button}>
          Book now
        </button>
      </form>
    </>
  );
};

export default BookingForm;
