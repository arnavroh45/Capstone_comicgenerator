import React from 'react';
import './PublishPage.css';
import background from '../assets/background.png'; // Update the path if necessary

const PublishPage = () => {
  return (
    <div className="publishpage-container">
    <form method='post' action='http://localhost:3001/publish'>
    <header className="publishpage-header" style={{ backgroundImage: `url(${background})` }}>
    <div className="publishpage-logo">Comic Gen</div>
    <div className="publishpage-input-section">
      <label htmlFor="title" className="publishpage-input-label">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Give a Title to your comic"
        className="publishpage-input-field"
      />
      <label htmlFor="description" className="publishpage-input-label">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        placeholder="Give a brief description of your comic"
        className="publishpage-input-field"
      />
      <button id='submit' type='submit' className="publishpage-publish-button">Publish</button>
    </div>
  </header>

      <div className="publishpage-content">
        <div className="publishpage-output-section">
          <div className="publishpage-output-placeholder">
            {/* This is where the generated content will appear */}
          </div>
        </div>
      </div>
      </form>
    </div>
  );
};

export default PublishPage;
