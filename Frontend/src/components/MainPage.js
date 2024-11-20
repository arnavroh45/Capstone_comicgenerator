import React from 'react';
import './MainPage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import headerBackground from '../assets/background.png'; // Make sure the path is correct

const MainPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePublish = () => {
    navigate('/publish'); // Navigate to the Publish page
  };

  return (
    <div className="mainpage-container">
      <header className="mainpage-header" style={{ backgroundImage: `url(${headerBackground})` }}>
        <div className="mainpage-logo">Comic Gen</div>
        <div className="mainpage-prompt-section">
          <input
            type="text"
            placeholder="Enter your prompt here"
            className="mainpage-prompt-input"
          />
          <button className="mainpage-generate-button">Generate</button>
        </div>
        <div className="mainpage-auth-buttons">
          {/* <button className="mainpage-auth-button">Sign Up/Sign In</button> */}
        </div>
      </header>

      <div className="mainpage-content">
        <div className="mainpage-output-section">
          <div className="mainpage-output-placeholder">
            {/* This is where the generated content will appear */}
          </div>
        </div>
        <div className="mainpage-actions">
          <button className="mainpage-action-button mainpage-save-draft">Save as Draft</button>
          <button className="mainpage-action-button mainpage-publish" onClick={handlePublish}>Publish</button> {/* Add onClick handler */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
