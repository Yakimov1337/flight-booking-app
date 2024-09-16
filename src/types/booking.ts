export interface Booking {
    id: string;
    firstName: string;
    lastName: string;
    departureAirportId: number;
    arrivalAirportId: number;
    departureDate: string;
    returnDate: string;
  }
  
  export interface PageableBookingList {
    list: Booking[];
    totalCount: number;
  }
  
  export type NewBooking = Omit<Booking, 'id'>;