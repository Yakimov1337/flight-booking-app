import { fetchAirports, fetchBookings, createBooking, deleteBooking } from './api';
import fetchMock from 'jest-fetch-mock';
import { Booking, PageableBookingList } from '../types/booking';
import { Airport } from '../types/airport';

beforeEach(() => {
  fetchMock.resetMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {}); 
});

afterEach(() => {
  jest.restoreAllMocks(); 
});

describe('API Tests', () => {
  test('fetchAirports should return a list of airports', async () => {
    const mockAirports: Airport[] = [
      { id: 1, code: 'SOF', title: 'Sofia Airport' },
      { id: 2, code: 'AMS', title: 'Amsterdam Airport Schiphol' },
    ];
    
    // Mocking the full URL including the base URL and auth token
    fetchMock.mockResponseOnce(JSON.stringify(mockAirports));

    const airports = await fetchAirports();
    expect(airports).toEqual(mockAirports);
    // Match the exact URL called including the base URL and query parameters
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_BASE_URL}/airports?authToken=${process.env.REACT_APP_API_TOKEN}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  });

  test('fetchAirports should handle API errors', async () => {
    fetchMock.mockRejectOnce(new Error('API is down'));

    await expect(fetchAirports()).rejects.toThrow('API is down');
  });

  test('fetchBookings should return a paginated list of bookings', async () => {
    const mockBookings: PageableBookingList = {
      list: [
        {
          id: '5125',
          firstName: 'John',
          lastName: 'Doe',
          departureAirportId: 10,
          arrivalAirportId: 12,
          departureDate: '2024-09-15T00:00:00.000Z',
          returnDate: '2024-09-24T00:00:00.000Z',
        },
      ],
      totalCount: 1,
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockBookings));

    const bookings = await fetchBookings(0);
    expect(bookings).toEqual(mockBookings);
    // Match the exact URL including base URL and query parameters
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_BASE_URL}/bookings?pageIndex=0&pageSize=3&authToken=${process.env.REACT_APP_API_TOKEN}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  });

  test('fetchBookings should handle API errors', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch booking'));

    await expect(fetchBookings(1)).rejects.toThrow('Failed to fetch booking');
  });

  test('createBooking should successfully create a booking', async () => {
    const bookingData: Booking = {
      id: '5133',
      firstName: 'John',
      lastName: 'Doe',
      departureAirportId: 1,
      arrivalAirportId: 2,
      departureDate: '2024-09-15T00:00:00.000Z',
      returnDate: '2024-09-20T00:00:00.000Z',
    };
    fetchMock.mockResponseOnce(JSON.stringify(bookingData));

    const newBooking = await createBooking(bookingData);
    expect(newBooking).toEqual(bookingData);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_BASE_URL}/bookings/create?authToken=${process.env.REACT_APP_API_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      }
    );
  });

  test('createBooking should handle API errors', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to create booking'));

    const bookingData: Booking = {
      id: '5134',
      firstName: 'John',
      lastName: 'Doe',
      departureAirportId: 1,
      arrivalAirportId: 2,
      departureDate: '2024-09-15T00:00:00.000Z',
      returnDate: '2024-09-20T00:00:00.000Z',
    };
    await expect(createBooking(bookingData)).rejects.toThrow('Failed to create booking');
  });

  test('deleteBooking should return status 200 on successful delete', async () => {
    fetchMock.mockResponseOnce('', { status: 200 });

    const responseStatus = await deleteBooking('1');
    expect(responseStatus).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_BASE_URL}/bookings/delete/1?authToken=${process.env.REACT_APP_API_TOKEN}`,
      {
        method: 'DELETE',
      }
    );
  });

  test('deleteBooking should handle API errors', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to delete booking'));

    await expect(deleteBooking('1')).rejects.toThrow('Failed to delete booking');
  });
});
