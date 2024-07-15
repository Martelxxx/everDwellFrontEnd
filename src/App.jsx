import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './Components/HomePage/homePage';
import Agents from './Components/Agents/agents';
import BuyerForm from './Components/Buyers/BuyerForm/buyerForm';
import BuyerList from './Components/Buyers/BuyerList/buyerList';
import RoomRatingForm from './Components/roomRatingForm';
import NavBar from './Components/NavBar/navBar';

const App = () => {
  const [buyerData, setBuyerData] = useState(null);
  const [matchedEntries, setMatchedEntries] = useState([]);
  const [message, setMessage] = useState('');

  const handleBuyerSubmit = (buyer) => {
    setBuyerData(buyer);
  };

  const handleFinalSubmit = async (buyer, navigate) => {
    console.log('Submitting buyer data:', buyer);  // Log the data being submitted

    const response = await fetch('http://localhost:8000/api/buyers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buyer),
    });

    if (response.ok) {
      setMessage('Buyer created successfully!');
      setBuyerData(null);
      navigate('/');
    } else {
      const errorData = await response.json();
      console.error('Failed to create buyer:', errorData);  // Log the error response
      setMessage(`Failed to create buyer: ${JSON.stringify(errorData)}`);
    }
  };

  const handleRatingSubmit = async (rating) => {
    setBuyerData((prevData) => ({ ...prevData, homeRating: rating }));

    if (buyerData && buyerData.phone) {
      await fetchMatchedEntries(buyerData.phone);
    }
  };

  const fetchMatchedEntries = async (phone) => {
    try {
      const response = await fetch(`http://localhost:8000/api/buyers/by_phone/?phone=${phone}`);
      const data = await response.json();
      setMatchedEntries(data);
    } catch (error) {
      console.error("Failed to fetch matched entries:", error);
    }
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agents" element={<Agents />} />
        <Route
          path="/buyer"
          element={
            <BuyerWrapper
              buyerData={buyerData}
              matchedEntries={matchedEntries}
              onBuyerSubmit={handleBuyerSubmit}
              onFinalSubmit={handleFinalSubmit}
              message={message}
              setMessage={setMessage}
            />
          }
        />
        <Route
          path="/room-rating"
          element={
            <RoomRatingWrapper
              buyerData={buyerData}
              onRatingSubmit={handleRatingSubmit}
            />
          }
        />
        <Route path="/buyer-list" element={<BuyerList />} />
      </Routes>
      {message && <p>{message}</p>}
    </Router>
  );
};

const BuyerWrapper = ({ buyerData, matchedEntries, onBuyerSubmit, onFinalSubmit, message, setMessage }) => {
  const navigate = useNavigate();

  const handleNext = (buyer) => {
    onBuyerSubmit(buyer);
    navigate('/room-rating');
  };

  const handleSubmit = (buyer) => {
    onFinalSubmit(buyer, navigate);
  };

  return (
    <BuyerForm
      initialData={buyerData}
      matchedEntries={matchedEntries}
      onNext={handleNext}
      onSubmit={handleSubmit}
      message={message}
      setMessage={setMessage}
    />
  );
};

const RoomRatingWrapper = ({ buyerData, onRatingSubmit }) => {
  const navigate = useNavigate();

  const handleRatingSubmit = async (rating) => {
    await onRatingSubmit(rating);

    navigate('/buyer');
  };

  return (
    <RoomRatingForm onSubmit={handleRatingSubmit} />
  );
};

export default App;
