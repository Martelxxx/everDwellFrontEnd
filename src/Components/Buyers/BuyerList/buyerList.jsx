import React, { useState } from 'react';

const BuyerList = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/buyers/search/?phone=${phone}&email=${email}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
        if (data.length === 0) {
          setMessage('No entries found.');
        } else {
          setMessage('');
        }
      } else {
        setMessage('Failed to fetch entries.');
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
      setMessage('Error fetching entries.');
    }
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
      <h2>Search For Your Ratings</h2>
      <div className="buyerForm">
      <form onSubmit={handleSearch}>
        <div className='inputs'>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className='inputs'>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Search</button>
      </form>
      </div>
      {message && <p>{message}</p>}
      {results.length > 0 && (
        <div>
          <h2>Results</h2>
          <ul>
            {results.map((entry) => (
              <li key={entry.id}>
                {/* <p>Name: {entry.name}</p> */}
                {/* <p>Email: {entry.email}</p> */}
                {/* <p>Phone: {entry.phone}</p> */}
                <div className="results">
                <h4>{entry.address}</h4>
                <p>Budget: {formatCurrency(entry.budget)}</p>
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

export default BuyerList;
