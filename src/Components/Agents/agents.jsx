import React from 'react'
import { useState, useEffect } from 'react'
import AgentList from './AgentList/agentList'
import AgentForm from './AgentForm/agentForm'
import * as agentService from '../../Services/agents'

const Agents = () => {
    const [agents, setAgents] = useState([])
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const agents = await agentService.fetchAgents();
                setAgents(agents);
                setIsFetching(false);
            } catch (error) {
                console.error("Failed to fetch agents:", error);
                setIsFetching(false);
                // Optionally, set an error state to display an error message to the user
            }
        };
        fetchAgents();
    }, []);

    const handleAddAgent = async (agent) => {
        const newAgent = await agentService.createAgent(agent)
        setAgents([...agents, newAgent])
    }

    const handleDeleteAgent = async (id) => {
        const deletedAgent = await agentService.deleteAgent(id)
        setAgents(agents.filter((agent) => agent.id !== deletedAgent.id))
    }

    return (
        <div>
            <AgentForm handleAddAgent={handleAddAgent} />
            <AgentList agents={agents} handleDeleteAgent={handleDeleteAgent} />
        </div>
    )
};

export default Agents;