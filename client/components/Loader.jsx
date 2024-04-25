import video from "../assets/loader.mp4"
import React from 'react';

const Loader = () => {
  return (
    <div>
      <h2>LOADING</h2>
      <video src={video} autoPlay={true} loop={true} muted={true} height="500px" width="700px"/>
    </div>
  );
};

export default Loader;