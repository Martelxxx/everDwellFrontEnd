import React, { useState } from 'react';
import './roomRatingForm.css';

const rooms = {
  commonAreas: ["entrance", "living room", "kitchen", "dining room"],
  bathrooms: ["Primary bathroom", "bathroom1", "bathroom2", "bathroom3", "bathroom4", "bathroom5"],
  bedrooms: ["Primary bedroom", "bedroom1", "bedroom2", "bedroom3", "bedroom4"],
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
  return string.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
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
        <h4>🏠💬⭐ Rate Your Home ⭐💬🏠</h4>
        <p className="small">Rate each room in your home to get an overall rating. Scroll to bottom once done!</p>
        <form onSubmit={handleSubmit}>
          {Object.entries(rooms).map(([category, roomList]) => (
            <div key={category} className="roomCategory">
              <h5>{capitalizeFirstLetter(category)}</h5>
              <div className="small">
                {category === 'commonAreas' && "Rate the common areas of your home, such as the living room, kitchen, and dining room."}
                {category === 'bathrooms' && "Rate the bathrooms in your home."}
                {category === 'bedrooms' && "Rate the bedrooms in your home."}
                {category === 'other' && "Others can include offices, media rooms, home gyms, extra bedrooms, bathrooms beyond the usual allotment, basements, garages, and yards."}
              </div>
              <br></br>
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
              <hr /> {/* Horizontal line between categories */}
            </div>
          ))}
          {isNextEnabled && <button type="submit">Next</button>}
        </form>
      </div>
    </>
  );
};

export default RoomRatingForm;
