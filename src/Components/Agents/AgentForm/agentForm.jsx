import { useState } from 'react';

// Form to add a new agent
const AgentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agency, setAgency] = useState('');
  const [message, setMessage] = useState('');  // State for success message

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8000/api/agents/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, agency }),
    });

    if (response.ok) {
      setMessage('Agent created successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setAgency('');
    } else {
      const errorData = await response.json();
      setMessage(`Failed to create agent: ${JSON.stringify(errorData)}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </div>
        <div>
          <label>Agency:</label>
          <input type="text" value={agency} onChange={(event) => setAgency(event.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}  {/* Display success or error message */}
    </div>
  );
  };
  
  export default AgentForm;