import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booking, PageableBookingList } from '../types/booking';

interface BookingState {
  bookings: Booking[]; 
  loading: boolean; 
  error: string | null; 
  page: number; 
  totalCount: number; 
}

const initialState: BookingState = {
  bookings: [], 
  loading: false, 
  error: null, 
  page: 0, 
  totalCount: 0, 
};

const bookingSlice = createSlice({
  name: 'bookings', 
  initialState,
  reducers: {
    // add new bookings to the list
    appendBookings: (state, action: PayloadAction<PageableBookingList>) => {
      // filter new bookings that are not already in the list
      const newBookings = action.payload.list.filter(
        (newBooking) =>
          !state.bookings.some((existing) => existing.id === newBooking.id)
      );
      // add new bookings to the state
      state.bookings = [...state.bookings, ...newBookings];
      // update the total count of bookings
      state.totalCount = Number(action.payload.totalCount); 
    },
    // add a single booking to the list
    bookingCreate: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload); // add the new booking to the list
      state.totalCount += 1; // increase total count 
    },
    // remove a booking by id
    removeBooking: (state, action: PayloadAction<string>) => {
      // keep all bookings except the one with the matching id
      state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
      state.totalCount -= 1; // decrease total count 
    },
    // go to the next page of bookings if not already loading and more bookings exist
    incrementPage: (state) => {
        if (!state.loading && state.bookings.length < state.totalCount) {
          state.page += 1; // increase the page number
        }
      },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload; 
    },
  },
});

export const { appendBookings, bookingCreate, removeBooking, incrementPage, setLoading, setError } = bookingSlice.actions;
export default bookingSlice.reducer;
