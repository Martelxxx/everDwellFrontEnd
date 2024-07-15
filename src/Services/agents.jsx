//Index Route
const fetchAgents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/agents/');
      const agents = await response.json();
      return agents;
    } catch (error) {
      console.error('Error fetching agents: ', error);
    }
  }

// Create Route
const createAgent = async (agent) => {
    try {
      const response = await fetch('http://localhost:8000/api/agents/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(agent)
      });
      const newAgent = await response.json();
      return newAgent;
    } catch (error) {
      console.error('Error creating agent: ', error);
    }
  }

// Update Route
const updateAgent = async (id, agent) => {
    try {
      const response = await fetch(`http://localhost:8000/api/agents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(agent)
      });
      const updatedAgent = await response.json();
      return updatedAgent;
    } catch (error) {
      console.error('Error updating agent: ', error);
    }
  }

// Delete Route
const deleteAgent = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/agents/${id}`, {
        method: 'DELETE'
      });
      const deletedAgent = await response.json();
      return deletedAgent;
    } catch (error) {
      console.error('Error deleting agent: ', error);
    }
  }

  export { fetchAgents, createAgent, updateAgent, deleteAgent };