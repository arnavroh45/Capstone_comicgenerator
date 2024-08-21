import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import PublishPage from './components/PublishPage'; // Import PublishPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/publish" element={<PublishPage />} /> {/* Route for PublishPage */}
      </Routes>
    </Router>
  );
}

export default App;


