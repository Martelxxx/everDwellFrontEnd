//Index Route
const fetchBuyers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/buyers/');
      const buyers = await response.json();
      return buyers;
    } catch (error) {
      console.error('Error fetching buyers: ', error);
    }
  }
  
  // Create Route
  const createBuyer = async (buyer) => {
    try {
      const response = await fetch('http://localhost:8000/api/buyers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(buyer)
      });
      const newBuyer = await response.json();
      return newBuyer;
    } catch (error) {
      console.error('Error creating buyer: ', error);
    }
  }
  
  // Update Route
  const updateBuyer = async (id, buyer) => {
    try {
      const response = await fetch(`http://localhost:8000/api/buyers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(buyer)
      });
      const updatedBuyer = await response.json();
      return updatedBuyer;
    } catch (error) {
      console.error('Error updating buyer: ', error);
    }
  }
  
  // Delete Route
  const deleteBuyer = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/buyers/${id}`, {
        method: 'DELETE'
      });
      const deletedBuyer = await response.json();
      return deletedBuyer;
    } catch (error) {
      console.error('Error deleting buyer: ', error);
    }
  }
  
  export { fetchBuyers, createBuyer, updateBuyer, deleteBuyer };