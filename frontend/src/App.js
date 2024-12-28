import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Hero from './components/Hero/Hero.js';
import Home from './pages/Home.js';
import About from './pages/About.js';
import CaseStudies from './pages/CaseStudies.js';
import Services from './pages/Services.js';
import Contact from './pages/Contact.js';
import PostDetail from './components/Posts/PostDetails';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home/';

  return (
    <>
      <Header />
      {!isHomePage && <Hero />}
      <Routes>
        <Route path="/" element={<Home pageId={17} />} />
        <Route path="/about-us" element={<About pageId={19} />} />
        <Route path="/home" element={<Home pageId={17} />} />
        <Route path="/services" element={<Services pageId={22} />} />
        <Route path="/case-studies" element={<CaseStudies pageId={24} />} />
        <Route path="/post/:slug" element={<PostDetail />} />
        <Route path="/contact-us" element={<Contact pageId={26} />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;