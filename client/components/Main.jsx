import Header from "./Header.jsx";
import { Link } from "react-router-dom";
import React from 'react';

const Main = () => {
  return (
    <div>
      <Header />
      <p>Let us plan the trip of your dreams...</p>
      <Link to='/form' id='start'>Click here to get started... </Link>
    </div>
  );
};

export default Main;