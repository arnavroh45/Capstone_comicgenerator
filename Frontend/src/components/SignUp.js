import React from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background.png'; // Ensure the path is correct

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData);
    const urlEncodedData = new URLSearchParams(formDataObj);

    try {
      const response = await fetch('http://localhost:3001/signup', { // Ensure the correct port is used
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData.toString(),
      });

      if (response.ok) {
        navigate('/main'); // Navigate to the main page on success
      } else {
        console.error('Sign-up failed with status:', response.status);
        const errorText = await response.text();
        console.error('Error message:', errorText);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="welcome-section" style={{ backgroundImage: `url(${background})` }}>
        <h1>Welcome to Comic Gen</h1>
        <p>AI-based Comic Generator</p>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;







