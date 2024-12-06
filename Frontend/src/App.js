import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import PublishPage from './components/PublishPage'; // Import PublishPage
import Home from './components/Home';
import Login from './components/Login';
import Reset  from './components/Reset';
import IntroPage from './components/Intro';
import DashboardPage from './components/Dashboard';
import Community from './components/Community';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/Reset" element={<Reset />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/publish" element={<PublishPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;


