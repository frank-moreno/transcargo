import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Header.scss';

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [siteLogo, setSiteLogo] = useState('');
  const [siteName, setSiteName] = useState('');

  const API_BASE_URL = 'http://localhost:8000/wp-json';

  useEffect(() => {
    // Fetch menu items
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/menus/v1/menus/primary`);
        const adjustedMenuItems = response.data.items.map((item) => ({
          ...item,
          url: new URL(item.url).pathname, // Convierte las URLs absolutas en relativas
        }));
        setMenuItems(adjustedMenuItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    // Fetch site info
    const fetchSiteInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/`);
        const { name, description, logo } = response.data;
        setSiteName(name);
        setSiteLogo(logo || '');
      } catch (error) {
        console.error('Error fetching site info:', error);
      }
    };

    fetchMenuItems();
    fetchSiteInfo();
  }, []);

  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          {/* Logo dinámico */}
          <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
            {siteLogo ? (
              <img src={siteLogo} alt={`${siteName} Logo`} className="site-logo" />
            ) : (
              siteName || 'Headless WordPress'
            )}
          </Link>

          {/* Menú dinámico */}
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <li key={item.id}>
                  <Link className="nav-link px-2 link-body-emphasis" to={item.url}>
                    {item.title}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li><Link className="nav-link px-2 link-secondary" to="/">Home</Link></li>
                <li><Link className="nav-link px-2 link-body-emphasis" to="/about">About</Link></li>
              </>
            )}
          </ul>

          <div className="text-end">
            <button type="button" className="btn btn-primary me-2">Login</button>
            <button type="button" className="btn btn-warning">Sign-up</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;