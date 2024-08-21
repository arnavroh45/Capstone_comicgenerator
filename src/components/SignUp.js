import React from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import background from '../assets/background.png'; // Make sure the path is correct

const SignUp = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSignUp = (event) => {
    event.preventDefault();
    // Here you would typically handle signup logic (like form validation, API calls, etc.)
    // For this example, we'll just navigate to the main page after form submission.
    navigate('/main'); // Navigate to the MainPage after signup
  };

  return (
    <div className="signup-container">
      <div className="welcome-section" style={{ backgroundImage: `url(${background})` }}>
        <h1>Welcome to Comic Gen</h1>
        <p>AI based Comic Generator</p>
      </div>
      <div className="form-section">
        <div className="form-container">
          <h2>Create your account</h2>
          <form onSubmit={handleSignUp}>
            <label>
              Name
              <input type="text" name="name" placeholder="Enter your name" required />
            </label>
            <label>
              Email address
              <input type="email" name="email" placeholder="Enter your email address" required />
            </label>
            <label>
              Password
              <input type="password" name="password" placeholder="Enter your password" required />
            </label>
            <button type="submit" className="signup-button">Sign Up</button>
            <button type="button" className="signin-button">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
