import React, { useState, useEffect } from 'react';

const BuyerForm = ({ initialData, onNext, onSubmit, message, setMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preapproval, setPreapproval] = useState(null); // Use null for initial state
  const [budget, setBudget] = useState('');
  const [address, setAddress] = useState('');
  const [homeRating, setHomeRating] = useState(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(initialData.phone);
      setPreapproval(initialData.preapproval);
      setBudget(initialData.budget);
      setAddress(initialData.address);
      setHomeRating(initialData.homeRating);
    }
  }, [initialData]);

  const handleNext = (e) => {
    e.preventDefault();
    onNext({ name, email, phone, preapproval, budget, address });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, phone, preapproval, budget, address, homeRating });
  };

  return (
    <div>
      <form onSubmit={homeRating !== null ? handleSubmit : handleNext}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Preapproval:</label>
          <label>
            <input
              type="radio"
              name="preapproval"
              value="yes"
              checked={preapproval === true}
              onChange={() => setPreapproval(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="preapproval"
              value="no"
              checked={preapproval === false}
              onChange={() => setPreapproval(false)}
            />
            No
          </label>
        </div>
        <div>
          <label>Budget:</label>
          <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        {homeRating !== null && (
          <div>
            <label>Home Rating:</label>
            <input type="text" value={homeRating.toFixed(2)} readOnly />
          </div>
        )}
        <button type="submit">{homeRating !== null ? 'Submit' : 'Next'}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BuyerForm;