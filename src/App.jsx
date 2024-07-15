import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './Components/HomePage/homePage';
import Agents from './Components/Agents/agents';
import BuyerForm from './Components/Buyers/BuyerForm/buyerForm';
import RoomRatingForm from './Components/roomRatingForm';

const App = () => {
  const [buyerData, setBuyerData] = useState(null);
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
      setMessage(`Failed to create buyer: ${JSON.stringify(errorData)}`);
    }
  };

  const handleRatingSubmit = (rating) => {
    setBuyerData((prevData) => ({ ...prevData, homeRating: rating }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agents" element={<Agents />} />
        <Route
          path="/buyer"
          element={
            <BuyerWrapper
              buyerData={buyerData}
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
      </Routes>
      {message && <p>{message}</p>}
    </Router>
  );
};

const BuyerWrapper = ({ buyerData, onBuyerSubmit, onFinalSubmit, message, setMessage }) => {
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
      onNext={handleNext}
      onSubmit={handleSubmit}
      message={message}
      setMessage={setMessage}
    />
  );
};

const RoomRatingWrapper = ({ buyerData, onRatingSubmit }) => {
  const navigate = useNavigate();

  const handleRatingSubmit = (rating) => {
    onRatingSubmit(rating);
    navigate('/buyer');
  };

  return (
    <RoomRatingForm onSubmit={handleRatingSubmit} />
  );
};

export default App;
