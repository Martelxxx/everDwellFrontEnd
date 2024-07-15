const AgentList = ({ agents, handleDeleteAgent }) => {
  return (
    <div>
      <h1>Agents</h1>
      <ul>
        {agents.map((agent) => (
          <li key={agent.id}>
            {agent.name}
            <button onClick={() => handleDeleteAgent(agent.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgentList;