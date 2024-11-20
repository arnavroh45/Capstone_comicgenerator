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
        <div className="button-container">
          <button 
            className="home-button" 
            onClick={() => navigate('/Login')}
          >
            Login
          </button>
          <button 
            className="home-button" 
            onClick={() => navigate('/Signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
