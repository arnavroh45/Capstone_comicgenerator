import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import PublishPage from './components/PublishPage'; // Import PublishPage
import Home from './components/Home';
import Login from './components/Login';
import Reset  from './components/Reset';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/Reset" element={<Reset />} />
        <Route path="/publish" element={<PublishPage />} /> {/* Route for PublishPage */}
      </Routes>
    </Router>
  );
}

export default App;


