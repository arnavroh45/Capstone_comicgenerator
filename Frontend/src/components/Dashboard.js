import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function DashboardPage() {
  const navigate = useNavigate();


  const handlePublishClick = () => {
    navigate("/publish");
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div id="naam" className="logo">AI ComicGen</div>
        <nav className="navigation">
          <a href="/">Home</a>
          <a href="/comics">Comics</a>
          <a href="/novels">Novels</a>
          <a href="/community">Community</a>
          <a href="/cultural">Cultural</a>
          
          <input type="search" placeholder="Search" />

          <button id="publish" className="btn-publish" onClick={handlePublishClick}>
            Publish
          </button>
        </nav>
      </header>

      {/* New Tab Section */}
      <div className="tabs-section">
        <button id="spotlight" className="tab-button">Spotlight</button>
        <button id="daily" className="tab-button">Daily</button>
        <button id="free" className="tab-button">Free Access</button>
        <button id="new" className="tab-button">New</button>
        <button id="popular" className="tab-button">Popular</button>
        <button id="completed" className="tab-button">Completed</button>
      </div>

      <div className="spotlight">
        {/* Vote Now Button */}
        <div className="vote-now">
          <button id="vote">VOTE NOW</button>
        </div>

        {/* Comic Highlight Section */}
        <div className="comic-highlight">
          {/* Comic Info */}
          <div className="comic-info">
            <h3>Comic Name</h3>
            <p>Comic description in a line</p>
            <div className="tags">
              <span className="badge">EVENT</span>
              <span className="category">Comic - Fantasy</span>
            </div>
          </div>

          {/* Comic Cover Placeholder */}
          <div className="comic-cover">yaha comic ka cover photo</div>
        </div>

        {/* Pagination Section */}
        <div className="pagination">
          <button className="arrow">&lt;</button>
          <span>5 / 13</span>
          <button className="arrow">&gt;</button>
        </div>
      </div>

      {/* Comic Grid Section */}
      <div className="comic-grid">
        {[...Array(8)].map((_, index) => (
          <div className="comic-card" key={index}>
            <span className="badge">EVENT</span>
            <div className="comic-thumbnail">comic name</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
