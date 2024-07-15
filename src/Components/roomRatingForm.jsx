import React, { useState } from 'react';

const rooms = [
  "entrance", "living room", "kitchen", "dining room", "bathroom", "bedroom", "bedroom1", "bedroom2", "bedroom3", "bedroom4",
  "bathroom1", "bathroom2", "room", "room1", "room2", "room3", "room4", "room5", "basement", "garage", "yard"
];

const ratings = [
  { value: 0, label: "Does not meet needs" },
  { value: 1, label: "Too small" },
  { value: 2, label: "Acceptable size, missing key features" },
  { value: 3, label: "Good size, acceptable feature-wise" },
  { value: 4, label: "Very Good all around" },
  { value: 5, label: "Perfect, absolutely nothing to change" }
];

const RoomRatingForm = ({ onSubmit }) => {
  const [ratingsState, setRatingsState] = useState(
    rooms.reduce((acc, room) => {
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
    <div>
      <form onSubmit={handleSubmit}>
        {rooms.map((room) => (
          <div key={room}>
            <label>
              <input
                type="checkbox"
                checked={ratingsState[room].active}
                onChange={() => handleCheckChange(room)}
              />
              {room}
            </label>
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
        {isNextEnabled && <button type="submit">Next</button>}
      </form>
    </div>
  );
};

export default RoomRatingForm;
