import React from "react";
import { useState } from "react";
import BuyerForm from "./BuyerForm/buyerForm";
import * as buyerService from "../../Services/buyers";

const Buyer = () => {
    const [message, setMessage] = useState("");
    const handleSubmit = async (buyer) => {
        try {
        const newBuyer = await buyerService.createBuyer(buyer);
        setMessage("Buyer created successfully!");
        } catch (error) {
        setMessage(`Failed to create buyer: ${error.message}`);
        }
    };
    
    return (
        <div>
        <BuyerForm handleSubmit={handleSubmit} />
        {message && <p>{message}</p>}
        </div>
    );
    };

export default Buyer;