import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleSendOtp = async () => {
    try {
      const response = await fetch('http://localhost:3001/send-email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('OTP sent to your email!');
        setStep(2); // Move to OTP verification step
      } else {
        const errorText = await response.text();
        alert('Failed to send OTP: ' + errorText);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:3001/verify-email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        alert('OTP verified successfully!');
        setStep(3); // Move to the name and password form
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      });

      if (response.ok) {
        alert('Registration successful!');
        navigate('/main'); // Navigate to the main page on success
      } else {
        const errorText = await response.text();
        alert('Failed to register: ' + errorText);
      }
    } catch (error) {
      console.error('Error during registration:', error);
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
          <h2>
            {step === 1
              ? 'Enter Your Email'
              : step === 2
              ? 'Verify OTP'
              : 'Complete Your Registration'}
          </h2>
          {step === 1 && (
            <div>
              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <button onClick={handleSendOtp} className="signup-button">
                Send OTP
              </button>
            </div>
          )}
          {step === 2 && (
            <div>
              <label>
                Enter OTP
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter the OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </label>
              <button onClick={handleVerifyOtp} className="signup-button">
                Verify OTP
              </button>
            </div>
          )}
          {step === 3 && (
            <div>
            <h2>Create your account</h2>
            <form onSubmit={handleRegister}>
              <label>
                Email
                <input type="email" value={email} readOnly />
              </label>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="signup-button">
                Register
              </button>
            </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
