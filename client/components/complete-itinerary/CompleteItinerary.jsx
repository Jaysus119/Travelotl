import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../header';
import SingleDayItinerary from '../single-day-itinerary/SingleDayItinerary';

const CompleteItinerary = () => {
  // const {itinerary} = useSelector((state) => state.itinerary.itinerary)
  const { itinerary, user, _id } = useSelector(
    (state) => state.itinerary.itinerary
  );
  console.log('state in Complete Itinerary -->', user, _id, itinerary);
  const [editedItinerary, setEditedItinerary] = useState({ itinerary });
  console.log('working w ADAM !--->', itinerary.trip);

  //=======> HANDLE CLICK <============
  const handleClick = async () => {
    console.log('state to send to back end', editedItinerary, user);
    try {
      const response = await fetch('/api/trip/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ ...editedItinerary, _id: _id }),
        _id,
      });
      if (response.ok) {
        console.log('successful patch');
      } else {
        throw new Error('failed to retrieve data');
      }
    } catch (error) {
      console.error('Error with patch request:', error);
    }
  };

  let dates;
  let dateComponents;

  if (itinerary) {
    dates = Object.keys(itinerary);

    dateComponents = dates.map((date) => {
      return (
        <div className="day-entry" key={date}>
          <h2 className="date">{date}</h2>
          <div className="day-details">
            <SingleDayItinerary
              editedItinerary={editedItinerary}
              dateObj={itinerary[date]}
              date={date}
              setEditedItinerary={setEditedItinerary}
            />
          </div>
        </div>
      );
    });
  }

  console.log('DATE COMP --->', dateComponents);

  const itineraryItems = itinerary ? (
    <div id="itinerary-details">
      <h2>Your Itinerary</h2>
      {dateComponents}
    </div>
  ) : null;

  return (
    <div>
      <Header />
      {itineraryItems}
      <button onClick={handleClick}>save this test</button>
    </div>
  );
};

export default CompleteItinerary;
