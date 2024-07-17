import React, { useState } from 'react';


const BuyerList = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://44.204.232.236:8000/api/buyers/search/?phone=${phone}&email=${email}`);
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://44.204.232.236:8000/api/buyers/${id}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setResults(results.filter((entry) => entry.id !== id));
        setMessage('Entry deleted successfully.');
      } else {
        setMessage('Failed to delete entry.');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      setMessage('Error deleting entry.');
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

  const getNextSteps = (rating) => {
    if (rating >= 0 && rating < 1) {
      return "🚫 This home does not meet your needs. Consider looking for entirely different options.";
    } else if (rating >= 1 && rating < 2) {
      return "👎 This home is too small. Look for larger homes that can accommodate your requirements.";
    } else if (rating >= 2 && rating < 3) {
      return "⚠️ This home has an acceptable size but is missing key features. Consider looking for homes with the necessary features.";
    } else if (rating >= 3 && rating < 4) {
      return "👍 This home has a good size and acceptable features. You may want to explore similar homes.";
    } else if (rating >= 4 && rating < 5) {
      return "👌 This home is very good all around. It might be worth a second look.";
    } else if (rating > 4.99) {
      return "🌟 This home is perfect. You should seriously consider making an offer.";
    } else {
      return "❓ Invalid rating.";
    }
  };

  return (
    <div className='search'>
      <div className="searchForm">
      <h3>🔎 Search For Your Ratings 📈</h3>
      <p className='small'>Find Ratings that you completed on other homes!</p>
        <form onSubmit={handleSearch}>
          <div className='inputs'>
            <label>Phone: 📞</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className='inputs'>
            <label>Email: 📧</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <p className='verySmall'>We prioritize your privacy at EverDwell. Your personal information is protected with top security measures and is never shared for marketing purposes.

Read our privacy policy for details.</p>
          <button type="submit">Search</button>
        </form>
      </div>
      {message && <p>{message}</p>}
      {results.length > 0 && (
        <div className='results'>
          <h2>Results</h2>
          <ul>
            {results.map((entry) => (
              <li key={entry.id}>
                <div className="results">
                  <h4>{entry.address}</h4>
                  <p>Budget: {formatCurrency(entry.budget)}</p>
                  <p>Home Rating: {entry.homeRating}</p>
                  <p>Next Steps: {getNextSteps(entry.homeRating)}</p>
                  <p>Date: {formatDate(entry.created_at)}</p>
                  <button onClick={() => handleDelete(entry.id)}>Delete</button>
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
