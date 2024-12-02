import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background.png';

const Reset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [step, setStep] = useState(1);

  const handleSendOtp = async () => {
    try {
      const response = await fetch('http://localhost:3001/reset-send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('OTP sent to your email!');
        setStep(2); 
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
      const response = await fetch('http://localhost:3001/reset-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        alert('OTP verified successfully!');
        setStep(3); 
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handleReset = async () => {
    try {
      const response = await fetch('http://localhost:3001/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password,repassword}),
      });

      if (response.ok) {
        alert('Registration successful!');
        navigate('/Dashboard'); 
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
            <h2>Enter your new password</h2>
            <form onSubmit={handleReset}>
                <label>
                Email
                <input type="email" value={email} readOnly />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="repassword"
                  placeholder="Enter your password again"
                  value={repassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="signup-button">
                Reset
              </button>
            </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reset;
