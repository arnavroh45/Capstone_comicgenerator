import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Footer from './Footer';
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
          <a style={{paddingTop:"18px"}} href="/">Home</a>
          <a style={{paddingTop:"18px"}} href="/user_comics">Comics</a>
          <a style={{paddingTop:"18px"}} href="/community">Community</a>
          <a style={{paddingTop:"18px"}} href="/liked">Liked</a>
          <a style={{paddingTop:"18px"}} href="/popular">Popular</a>
          <a style={{paddingTop:"18px"}} href="/new">New</a> 
          <input type="search" placeholder="Search" />
          <button id="publish" className="btn-publish" onClick={handlePublishClick}>
            Publish
          </button>
        </nav>
      </header>

      

      <div className="spotlight">
        {/* Vote Now Button */}
        <div className="vote-now">
          <button id="vote" onClick={() => navigate('/community')}>VOTE NOW</button>
        
        </div>

        {/* Comic Highlight Section */}
        <div className="comic-highlight">
          {/* Comic Info */}
          <div className="comic-info">
            <h3>Mirza and Sahiba</h3>
            <p>A series of visually rich and emotional comic panels that capture the poignant love story of Mirza and Sahiba, focusing on key moments of their journey</p>
            <div className="tags">
              <span className="category">Comic - Fantasy</span>
            </div>
          </div>

          {/* Comic Cover Placeholder */}
          <div className="comic-cover">
          <img 
  src="https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677566/Sahiba_born_in_a_rich_family_htyhnz.png" 
  alt="Comic Panel 1" 
  style={{ width: '400px', height: '400px', borderRadius: '8px' }} 
/>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default DashboardPage;
