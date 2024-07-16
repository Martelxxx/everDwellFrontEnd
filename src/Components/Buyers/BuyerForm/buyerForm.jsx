import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './buyerForm.css';

const BuyerForm = ({ initialData, matchedEntries, onNext, onSubmit, message, setMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preapproval, setPreapproval] = useState(null); // Use null for initial state
  const [budget, setBudget] = useState('');
  const [address, setAddress] = useState('');
  const [homeRating, setHomeRating] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showViewRatingsButton, setShowViewRatingsButton] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Load data from session storage on component mount
  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    if (sessionUser) {
      setName(sessionUser.name || '');
      setEmail(sessionUser.email || '');
      setPhone(sessionUser.phone || '');
      setPreapproval(sessionUser.preapproval || null);
      setBudget(sessionUser.budget || '');
      setIsLoggedIn(true);
    }
  }, []);

  // Load data passed via navigate state
  useEffect(() => {
    if (location.state && location.state.buyer) {
      const buyer = location.state.buyer;
      setName(buyer.name);
      setEmail(buyer.email);
      setPhone(buyer.phone);
      setPreapproval(buyer.preapproval);
      setBudget(buyer.budget);
      setAddress('');
      setHomeRating(null);
      setIsLoggedIn(true);
    }
  }, [location.state]);

  // Save user info to session storage whenever it changes
  useEffect(() => {
    const sessionUser = { name, email, phone, preapproval, budget };
    sessionStorage.setItem('user', JSON.stringify(sessionUser));
  }, [name, email, phone, preapproval, budget]);

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
    navigate('/room-rating'); // Navigate to room rating form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedHomeRating = homeRating ? parseFloat(homeRating).toFixed(2) : null;
    await onSubmit({ name, email, phone, preapproval, budget, address, homeRating: formattedHomeRating });
    setSubmitMessage('Information has been stored.');
    setShowViewRatingsButton(true);
    setHomeRating(null);
    setAddress('');
    setTimeout(() => setSubmitMessage(''), 3000); // Clear message after 3 seconds
    navigate('/buyer', { state: { buyer: { name, email, phone, preapproval, budget } } });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setName('');
    setEmail('');
    setPhone('');
    setPreapproval(null);
    setBudget('');
    setAddress('');
    setHomeRating(null);
    setIsLoggedIn(false);
    setShowViewRatingsButton(false);
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
    } else if (rating >= 5) {
      return "🌟 This home is perfect. You should seriously consider making an offer.";
    } else {
      return "❓ Invalid rating.";
    }
  };

  return (
    <div>
      <div className="buyerForm">
        <h3>
          Rate your new home, {name}!
          {isLoggedIn && (
            <small>
              {" "}
              Not {name}? <a onClick={handleLogout} className="logout">Click here</a>
            </small>
          )}
        </h3>
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
            <label>Pre-Approval:</label>
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
            <label>Future Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          {homeRating !== null && (
            <div className="inputs">
              <label>{address} Rating:</label>
              <input type="text" value={parseFloat(homeRating).toFixed(2)} readOnly />
              <p>Next Steps: {getNextSteps(parseFloat(homeRating))}</p>
            </div>
          )}
          <button type="submit">{homeRating !== null ? 'Save Result' : 'Next'}</button>
        </form>
        {submitMessage && <p>{submitMessage}</p>}
        {showViewRatingsButton && (
          <button onClick={() => navigate('/buyer-list')}>View All Ratings</button>
        )}
      </div>
  
      {message && <p>{message}</p>}
      
      {/* {matchedEntries.length > 0 && (
        <div className='results'>
          <h2>Last Rated Home</h2>
          <ul>
            <li key={matchedEntries[matchedEntries.length - 1].id}>
              <div className='results'>
                <h4>{matchedEntries[matchedEntries.length - 1].address}</h4>
                <p>Home Rating: {parseFloat(matchedEntries[matchedEntries.length - 1].homeRating).toFixed(2)}</p>
                <p>Date: {formatDate(matchedEntries[matchedEntries.length - 1].created_at)}</p>
              </div>
            </li>
          </ul>
        </div>
      )}*/}
    </div> 
  );  
};

export default BuyerForm;
