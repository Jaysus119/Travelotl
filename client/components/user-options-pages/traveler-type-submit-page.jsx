import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateItinerary } from "../../reducers/itineraryReducer";
import Loader from "../loader/Loader.jsx";

import { updateGroupDescription } from "../../reducers/tripReducer";
import { useState } from "react";
import { updateGroupDescription } from "../../reducers/tripReducer";
import { useState } from "react";

const TravelerTypeSubmitPage = () => {
  // page 6

  const { groupDescription } = useSelector((state) => state.trip);

  const [loading, setLoading] = useState(false);

  const formData = useSelector((state) => state.trip);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDescriptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch(updateGroupDescription(value));
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      console.log("data sent to back end server to make API request");
      const response = await fetch("/api/trip/build", {
        method: "POST",
      console.log("data sent to back end server to make API request");
      const response = await fetch("/api/trip/build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(formData),
      });
      const parsedData = await response.json();
      if (response.ok) {
        console.log("ok");
        dispatch(updateItinerary(parsedData));
        navigate("/itinerary");
        setLoading(false);
      } else {
        throw new Error("failed to retrieve data");
        throw new Error("failed to retrieve data");
      }
    } catch (error) {
      console.error("Error with request:", error);
      console.error("Error with request:", error);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
    if (event.key === "Enter") {
      await handleClick();
    }
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black ">
      <div>
        {loading ? (
          <div id="loader">
            <Loader />
          </div>
        ) : (
          <>
            <p>What best describes your travel group...</p>
            <ul className="groups">
              <li>
                <label className="group-card">
                  <input
                    type="radio"
                    name="groupDescription"
                    value="Solo traveler"
                    onChange={handleDescriptionChange}
                    checked={groupDescription === "Solo traveler"}
                    checked={groupDescription === "Solo traveler"}
                    onKeyDown={handleKeyDown}
                  />
                  Solo traveler
                </label>
              </li>
              <li>
                <label className="group-card">
                  <input
                    type="radio"
                    name="groupDescription"
                    value="Family with young kids"
                    onChange={handleDescriptionChange}
                    checked={groupDescription === "Family with young kids"}
                    checked={groupDescription === "Family with young kids"}
                    onKeyDown={handleKeyDown}
                  />
                  Family (young kids)
                </label>
              </li>
              <li>
                <label className="group-card">
                  <input
                    type="radio"
                    name="groupDescription"
                    value="Family of all ages"
                    onChange={handleDescriptionChange}
                    checked={groupDescription === "Family of all ages"}
                    checked={groupDescription === "Family of all ages"}
                    onKeyDown={handleKeyDown}
                  />
                  Family (all ages)
                </label>
              </li>
              <li>
                <label className="group-card">
                  <input
                    type="radio"
                    name="groupDescription"
                    value="Family of adults"
                    onChange={handleDescriptionChange}
                    checked={groupDescription === "Family of adults"}
                    checked={groupDescription === "Family of adults"}
                    onKeyDown={handleKeyDown}
                  />
                  Family (adults)
                </label>
              </li>
              <li>
                <label className="group-card">
                  <input
                    type="radio"
                    name="groupDescription"
                    value="Friends"
                    onChange={handleDescriptionChange}
                    checked={groupDescription === "Friends"}
                    checked={groupDescription === "Friends"}
                    onKeyDown={handleKeyDown}
                  />
                  Friends
                </label>
              </li>
            </ul>
            <div>
              <Link to="/form/page5">
                <button className="m-4 underline text-blue-600" type="button">
                  Back
                </button>
              </Link>
              <button
                className="m-4 underline text-blue-600"
                type="submit"
                onClick={handleClick}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TravelerTypeSubmitPage;
