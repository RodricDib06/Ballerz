// App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './BallerzNavbar.js';
import Home from './BallerzHome.js';
import Basketball from './Basketball.js'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Volleyball from './Volleyball.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basketball" element={<Basketball />} />
        <Route path="/volleyball" element={<Volleyball />} />
      </Routes>
    </Router>
  );
}

export default App;
