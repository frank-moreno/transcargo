import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Home from './pages/Home.js';
import About from './pages/About.js';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;