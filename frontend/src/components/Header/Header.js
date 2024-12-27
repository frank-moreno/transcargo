import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import axios from 'axios';

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [siteLogo, setSiteLogo] = useState('');
  const [activePath, setActivePath] = useState('/');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const API_BASE_URL = 'http://localhost:8000/wp-json';
  const location = useLocation();

  // Fetch menu items and site logo
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/menus/v1/menus/primary`);
        const adjustedMenuItems = response.data.items.map((item) => ({
          ...item,
          url: new URL(item.url).pathname,
        }));
        setMenuItems(adjustedMenuItems);

        if (adjustedMenuItems.length > 0 && !adjustedMenuItems.some((item) => item.url === location.pathname)) {
          setActivePath(adjustedMenuItems[0].url);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    const fetchSiteInfo = async () => {
      try {
        const logoId = 46;
        const response = await axios.get(`${API_BASE_URL}/wp/v2/media/${logoId}`);
        setSiteLogo(response.data.source_url);
      } catch (error) {
        console.error('Error fetching site logo:', error);
      }
    };

    fetchMenuItems();
    fetchSiteInfo();
  }, [location.pathname]);

  // Update active path on location change
  useEffect(() => {
    if (location.pathname === '/') {
      setActivePath('/');
    }
  }, [location.pathname]);

  // Manage body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  const handleLinkClick = (url) => {
    setActivePath(url);
    setIsMenuOpen(false);
  };

  const getActiveClass = (url) => (activePath === url ? 'active' : '');

  return (
    <header className="header p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between position-relative">
          {/* Logo */}
          <Link
            to="/"
            className={`d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none ${
              getActiveClass('/')
            }`}
            onClick={() => handleLinkClick('/')}
          >
            {siteLogo ? (
              <img src={siteLogo} alt="Site Logo" className="site-logo" />
            ) : (
              'Site Name'
            )}
          </Link>

          {/* Navigation Menu */}
          <nav
            className={`${
              isMenuOpen ? 'd-flex' : 'd-none d-lg-flex'
            } flex-column flex-lg-row align-items-center mx-auto`}
            style={{
              position: isMenuOpen ? 'fixed' : 'static',
              top: 0,
              left: 0,
              width: isMenuOpen ? '100%' : 'auto',
              height: isMenuOpen ? '100%' : 'auto',
              backgroundColor: isMenuOpen ? '#fff' : 'transparent',
              zIndex: 1040,
              justifyContent: isMenuOpen ? 'center' : 'center',
            }}
          >
            <ul className="nav flex-column flex-lg-row gap-4">
              {menuItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <Link
                    to={item.url}
                    className={`nav-link px-2 link-body-emphasis ${getActiveClass(item.url)}`}
                    onClick={() => handleLinkClick(item.url)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* New Component for mobile */}
            {isMenuOpen && (
              <div className="d-block d-xl-none mt-4 text-center">
                <div className="text-end">
                  <a href="tel:+990123456789" className="btn btn-outline">
                    +990 123 456 789
                  </a>
                  <a href="mailto:info@email.com" className="btn btn-email"></a>
                </div>
              </div>
            )}
          </nav>

          {/* New Component (Desktop Only) */}
          <div className="d-none d-lg-flex text-end">
            <a href="tel:+990123456789" className="btn btn-outline">
              +990 123 456 789
            </a>
            <a href="mailto:info@email.com" className="btn btn-email"></a>
          </div>

          {/* Hamburger Button */}
          <button
            className="d-lg-none btn border-0 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            style={{ zIndex: 1050 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Overlay for mobile */}
        {isMenuOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-black opacity-50 d-lg-none"
            style={{ zIndex: 1030 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;