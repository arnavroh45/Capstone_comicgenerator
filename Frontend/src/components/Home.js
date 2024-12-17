import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Create a CSS file to style the Home page
import background from '../assets/background.png'; // Replace with your own image if needed
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section" style={{ backgroundImage: `url(${background})` }}>
        <h1>Welcome to Comic Gen</h1>
        <p>Unleash creativity with AI-powered comics</p>
      </div>
      <div className="options-section">
      <h2>Join Comic Gen Today!</h2>
      <p>Log in to continue your adventures or sign up to start creating AI-powered comics.</p>
      <div className="button-container">
        <button className="home-button" onClick={() => navigate('/Login')}>Sign Up</button>
        <button className="home-button" onClick={() => navigate('/Signup')}>Login</button>
      </div>
      <hr />
    </div>
    
    </div>
  );
};

export default Home;
