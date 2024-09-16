import { Booking, NewBooking, PageableBookingList } from '../types/booking';
import { Airport } from '../types/airport';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const fetchAirports = async (): Promise<Airport[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/airports?authToken=${API_TOKEN}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to fetch booking');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch airports', error);
    throw error;
  }
};

export const fetchBookings = async (pageIndex: number, pageSize: number = 3): Promise<PageableBookingList> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings?pageIndex=${pageIndex}&pageSize=${pageSize}&authToken=${API_TOKEN}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to fetch booking');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch bookings', error);
    throw error;
  }
};

export const createBooking = async (bookingData: NewBooking): Promise<Booking> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/create?authToken=${API_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to create booking');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to add booking', error);
    throw error;
  }
};

export const deleteBooking = async (bookingId: string): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/delete/${bookingId}?authToken=${API_TOKEN}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to delete booking');
    }
    return response.status;
  } catch (error) {
    console.error('Failed to delete booking', error);
    throw error;
  }
};
