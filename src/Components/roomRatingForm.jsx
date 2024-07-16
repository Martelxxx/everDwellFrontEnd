import React, { useState } from 'react';
import './roomRatingForm.css';

const rooms = {
  commonAreas: ["entrance", "living room", "kitchen", "dining room"],
  bathrooms: ["bathroom", "bathroom1", "bathroom2", "bathroom3", "bathroom4", "bathroom5"],
  bedrooms: ["bedroom", "bedroom1", "bedroom2", "bedroom3", "bedroom4"],
  other: ["room", "room1", "room2", "room3", "room4", "room5", "basement", "garage", "yard"]
};

const ratings = [
  { value: 0, label: "Does not meet needs" },
  { value: 1, label: "Too small" },
  { value: 2, label: "Acceptable size, missing key features" },
  { value: 3, label: "Good size, acceptable feature-wise" },
  { value: 4, label: "Very Good all around" },
  { value: 5, label: "Perfect, absolutely nothing to change" }
];

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const RoomRatingForm = ({ onSubmit, matchedEntries }) => {
  const [ratingsState, setRatingsState] = useState(
    Object.values(rooms).flat().reduce((acc, room) => {
      acc[room] = { active: false, rating: 0 };
      return acc;
    }, {})
  );

  const handleCheckChange = (room) => {
    setRatingsState({
      ...ratingsState,
      [room]: { ...ratingsState[room], active: !ratingsState[room].active }
    });
  };

  const handleRatingChange = (room, rating) => {
    setRatingsState({
      ...ratingsState,
      [room]: { ...ratingsState[room], rating }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const activeRooms = Object.values(ratingsState).filter(room => room.active);
    const totalRating = activeRooms.reduce((sum, room) => sum + room.rating, 0);
    const homeRating = activeRooms.length ? totalRating / activeRooms.length : 0;

    onSubmit(homeRating);
  };

  const isNextEnabled = Object.values(ratingsState).some(room => room.active);

  return (
    <>
      <div className="roomRatingForm">
        <h4>Rate Your Home</h4>
        <form onSubmit={handleSubmit}>
          {Object.entries(rooms).map(([category, roomList]) => (
            <div key={category} className="roomCategory">
              <h5>{capitalizeFirstLetter(category)}</h5>
              {roomList.map((room) => (
                <div key={room} className="roomInputs">
                  <div className="roomInputWrapper">
                    <div className="checkboxContainer">
                      <input
                        type="checkbox"
                        checked={ratingsState[room].active}
                        onChange={() => handleCheckChange(room)}
                      />
                    </div>
                    <div className="roomName">{capitalizeFirstLetter(room)}</div>
                  </div>
                  {ratingsState[room].active && (
                    <select
                      value={ratingsState[room].rating}
                      onChange={(e) => handleRatingChange(room, parseInt(e.target.value, 10))}
                    >
                      {ratings.map((rating) => (
                        <option key={rating.value} value={rating.value}>
                          {rating.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          ))}
          {isNextEnabled && <button type="submit">Next</button>}
        </form>
      </div>
      {/* <footer style={{ position: 'fixed', bottom: 0, width: '100%', height: '6.5%', textAlign: 'center', padding: '10px', backgroundColor: '#f9f3e9' }}>
      © 2023 Your Company Name
    </footer> */}
    </>
  );
};

export default RoomRatingForm;

