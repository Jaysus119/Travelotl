const Itinerary = ({ itinerary }) => {
  // console.log("Itinerary Component:", itinerary.itinerary.itinerary);
  if (itinerary) return (
    <div id='itinerary-details'>
      {Object.entries(itinerary.itinerary).map(([date, timesOfDay]) => (
        <div className="day-entry" key={date}>
          <h2 className='date'>{date}</h2>
          <div className="day-details">
            {Object.entries(timesOfDay).map(([timeOfDay, suggestion]) => (
              <div className='activity-details' key={timeOfDay}>
                <h3 className="time-of-day">{timeOfDay}</h3>
                <p>Activity: {suggestion.activity}</p>
                <p>Description: {suggestion.description}</p>
                <p>Address: {suggestion.address}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
