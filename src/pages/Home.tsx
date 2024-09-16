import React from 'react';
import HeroSection from '../components/HeroSection';
import BookingList from '../components/Booking/BookingList';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <BookingList/>
    </>
  );
};

export default Home;
