import { useSelector } from "react-redux";
import React from 'react';
import Header from "./Header.jsx";
import Itinerary from "./Itinerary.jsx"


const ItineraryPage = () => {
  const itinerary = useSelector(state => state.itinerary);
  return (
    <div>
      <Header />
      <h2>Your Itinerary</h2>
      <Itinerary itinerary={itinerary} />
    </div>
  );
};

export default ItineraryPage;