import React from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background.png'; // Ensure the path is correct
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData);
    const urlEncodedData = new URLSearchParams(formDataObj);

    try {
      const response = await axios.post('http://localhost:3001/signup', urlEncodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(response);

      if (response.status === 200) {

        console.log(response.data)
        localStorage.setItem('token', response.data.token)

        navigate('/Dashboard'); // Navigate to the main page on success
      } else {
        alert("Add correct details.User already exists!!");
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
        <h2 style={{color: "black" }}>Enter your details</h2>
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







