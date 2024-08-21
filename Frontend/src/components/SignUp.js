import React from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import background from '../assets/background.png'; // Ensure the path is correct

const SignUp = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevents the default form submission

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData); // Convert FormData to an object
    const urlEncodedData = new URLSearchParams(formDataObj); // Convert object to URLSearchParams

    try {
      const response = await fetch('http://localhost:3001/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set content type to URL-encoded
        },
        body: urlEncodedData.toString(), // Convert URLSearchParams to string
      });

      if (response.ok) {
        // Navigate to the main page after successful signup
        navigate('/main');
      } else {
        // Handle errors here
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
            {/* <button type="button" className="signin-button">Sign In</button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
