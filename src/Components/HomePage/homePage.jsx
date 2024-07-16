import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="homePage">
            <div className="contain">
            <div className="header">
                <h2>📝 Welcome to EverDwell 🏡</h2>
                <div className="buttons">
                    <button onClick={() => navigate('/buyer')}>Rate Now!</button>
                    <button onClick={() => navigate('/buyer-list')}>Ratings</button>
                </div>
            </div>
            </div>
            <div className="section headline">
                <div className="headline-text">
                    <h2>Your Ultimate Home Rating Solution</h2>
                    <p>🏠</p>
                    <p>Find and rate your dream home with EverDwell. Our platform helps you evaluate different aspects of homes to ensure you make the best choice.</p>
                    <p>⭐️</p>
                </div>
            </div>
    
            <div className="section subheading">
                <h2>🔍 Why Choose EverDwell?</h2>
                <p>Discover the benefits of using our comprehensive home rating system and how it can simplify your home search process.</p>
            </div>
    
            <div className="section cta">
                <h2>🚀 Get Started Now</h2>
                <p>Sign up today and start rating homes to find your ideal living space.</p>
            </div>
    
            <div className="section social-proof">
                <h2>🗣️ What Our Users Say</h2>
                <p>Read testimonials and reviews from satisfied EverDwell users.</p>
            </div>
    
            <div className="section benefits">
                <h2>✨ Key Benefits</h2>
                <p>✅ Accurate and comprehensive home ratings.</p>
                <p>✅ Easy-to-use interface.</p>
                <p>✅ Save and compare multiple homes.</p>
            </div>
    
            <div className="section process">
                <h2>🔄 How It Works</h2>
                <p>Learn about our simple and effective home rating process.</p>
            </div>
    
            <div className="section included">
                <h2>📋 What’s Included</h2>
                <p>Get detailed insights into each home you rate, including room-specific scores and overall ratings.</p>
            </div>
    
            <div className="section cta">
                <h2>✍️ Join EverDwell Today</h2>
                <p>Create an account and start your journey to finding the perfect home.</p>
            </div>
    
            <div className="section about-us">
                <h2>👥 About EverDwell</h2>
                <p>Learn more about our mission and the team behind EverDwell.</p>
            </div>
    
            <div className="section social-proof">
                <h2>🏆 Success Stories</h2>
                <p>Read about how EverDwell has helped others find their dream homes.</p>
            </div>
    
            <div className="section faq">
                <h2>❓ Frequently Asked Questions</h2>
                <p>Find answers to common questions about EverDwell.</p>
            </div>
    
            <div className="section cta">
                <h2>📞 Contact Us</h2>
                <p>Have more questions? Get in touch with our team.</p>
            </div>
            <footer>
                © 2023 Your Company Name
            </footer>
        </div>
    );
}

export default HomePage;
