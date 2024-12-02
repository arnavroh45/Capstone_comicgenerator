import React from 'react';
import './Intro.css'; // Import your custom CSS file for styling
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/storyy.jpg'; // Add a hero image
import pageDesignerIcon from '../assets/images.png'; // Example icons
import textToImageIcon from '../assets/download (9).jpg';
import imageToImageIcon from '../assets/download (10).jpg';
import controlNetIcon from '../assets/download (11).jpg';
import Footer from './Footer';
const IntroPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle "Get Started" button click
    const handleGetStarted = () => {
        navigate('/Home'); // Navigate to the sign page
    };

  

    return (
        <div className="intro-container">
            <header className="intro-header">
                <div className="hero-section">
                    <div className="hero-text">
                        <h1 className="title">Create Comics with AI!</h1>
                        <p className="subtitle">Unleash your creativity with AI-driven comic generation and design tools.</p>
                        <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
                    </div>
                    <br></br>
                    <img src={heroImage} alt="AI Comic Hero" className="hero-image" />
                </div>
            </header>

            <section className="features-section">
                <h2 className="features-title">Bring Out the Artist in You</h2>
                <p className="features-subtitle">Leverage the power of AI to unlock your creativity.</p>
                <div className="features-grid">
                    <div className="feature-card">
                        <img src={pageDesignerIcon} alt="Page Designer" className="feature-icon" />
                        <h3>Automated Art Creation</h3>
                        <p>Easily transform your ideas into vibrant comic visuals with our designer.</p>
                    </div>
                    <div className="feature-card">
                    <img src={textToImageIcon} alt="Text to represent the functionality" className="feature-icon" />
                    <h3>Text to Image</h3>
                        <p>Convert your descriptions into stunning comic illustrations with the power of AI.</p>
                    </div>
                    <div className="feature-card">
                        <img src={imageToImageIcon} alt="Prompt to story" className="feature-icon" />
                        <h3>User-Friendly Interface</h3>
                        <p>Simple interface for arranging panels, characters, and backgrounds</p>
                    </div>
                    <div className="feature-card">
                        <img src={controlNetIcon} alt="ControlNet" className="feature-icon" />
                        <h3>AI Writing Assistance</h3>
                        <p>Helps generate story ideas, plot twists, or character arcs</p>
                    </div>
                </div>
            </section>
            <br></br>
            <br></br><br></br>
            <br></br><br></br>
            <br></br><br></br>
            <Footer />
        </div>
    );
};

export default IntroPage;
