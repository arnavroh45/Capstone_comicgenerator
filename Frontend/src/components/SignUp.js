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
    const urlEncodedData = new URLSearchParams(formDataObj).toString();

    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData,
      });

      // Check if the response status is OK (status code 200-299)
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);

        // Assuming the response contains a token
        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate('/Dashboard'); // Navigate to the main page on success
        } else {
          alert('Sign-up successful, but no token received.');
        }
      } else {
        // Handle non-200 responses
        const errorData = await response.json(); // Assuming the error response is JSON
        alert(errorData.message || 'Add correct details. User already exists!!');
        console.error('Sign-up failed with status:', response.status, 'and message:', errorData.message);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      alert('An error occurred during sign-up. Please try again later.');
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
          <h2 style={{ color: "black" }}>Enter your details</h2>
          <form onSubmit={handleSignUp}>

            <label>
              Name
              <input type="text" id="name" name="name" placeholder="Enter your name" required />
            </label>
            <label>
              Email address
              <input type="email" id="email" name="email" placeholder="Enter your email address" required />
            </label>
            <label>
              Password
              <input type="password" id="password" name="password" placeholder="Enter your password" required />
            </label>
            <label>
              <a href='http://localhost:3002/Reset'>Forgot Password</a>
            </label>
            <button id="signup" type="submit" className="signup-button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
