import React, { useState, useEffect } from 'react';
import './buyerForm.css';

const BuyerForm = ({ initialData, matchedEntries, onNext, onSubmit, message, setMessage }) => {
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div>
  <h2>Rate your new home!</h2>
  <div className="buyerForm">
    <form onSubmit={homeRating !== null ? handleSubmit : handleNext}>
      <div className="inputs">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="inputs">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="inputs">
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="inputs">
        <label>Preapproval:</label>
        <label>
          <input
            type="radio"
            name="preapproval"
            value="true"
            checked={preapproval === true}
            onChange={() => setPreapproval(true)}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="preapproval"
            value="false"
            checked={preapproval === false}
            onChange={() => setPreapproval(false)}
          />
          No
        </label>
      </div>
      <div className="inputs">
        <label>Budget:</label>
        <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} />
      </div>
      <div className="inputs">
        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      {homeRating !== null && (
        <div className="inputs">
          <label>Home Rating:</label>
          <input type="text" value={homeRating.toFixed(2)} readOnly />
        </div>
      )}
      <button type="submit">{homeRating !== null ? 'Submit' : 'Next'}</button>
    </form>
  </div>

      {message && <p>{message}</p>}

      {matchedEntries.length > 0 && (
        <div>
          <h2>Matched Entries</h2>
          <ul>
            {matchedEntries.map((entry) => (
              <li key={entry.id}>
                {/* <p>Name: {entry.name}</p> */}
                {/* <p>Email: {entry.email}</p> */}
                {/* <p>Phone: {entry.phone}</p> */}
                {/* <p>Budget: {entry.budget}</p> */}
                {/* <div className='entry-field'> */}
                <div className='results'>
                <h4>{entry.address}</h4>
                <p>Home Rating: {entry.homeRating}</p>
                <p>Date: {formatDate(entry.created_at)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BuyerForm;
