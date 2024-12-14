import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [siteLogo, setSiteLogo] = useState('');
  const [siteName, setSiteName] = useState('');

  const API_BASE_URL = 'http://localhost:8000/wp-json';
  const location = useLocation(); // Obtén la ruta activa

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

    // Fetch site info (including logo)
    const fetchSiteInfo = async () => {
      try {
        const logoId = 46; // Reemplaza con el ID real del logo
        const response = await axios.get(`${API_BASE_URL}/wp/v2/media/${logoId}`);
        setSiteLogo(response.data.source_url); // Establece la URL del logo
      } catch (error) {
        console.error('Error fetching site logo:', error);
      }
    };

    fetchMenuItems();
    fetchSiteInfo();
  }, []);

  return (
    <header className="header p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center">

          {/* Logo dinámico */}
          <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
            {siteLogo ? (
              <img src={siteLogo} alt={`${siteName} Logo`} className="site-logo" />
            ) : (
              siteName || 'Headless WordPress'
            )}
          </Link>

          {/* Menú dinámico */}
          <ul className="nav col-12 col-lg-auto me-lg-auto ms-lg-auto mb-2 justify-content-center mb-md-0">
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    className={`nav-link px-2 link-body-emphasis ${
                      location.pathname === item.url ? 'active' : ''
                    }`}
                    to={item.url}
                  >
                    {item.title}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li>
                  <Link
                    className={`nav-link px-2 link-secondary ${
                      location.pathname === '/' ? 'active' : ''
                    }`}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={`nav-link px-2 link-body-emphasis ${
                      location.pathname === '/about' ? 'active' : ''
                    }`}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Botones de Login y Sign-up */}
          <div className="text-end">
            <a href="tel:+990 123 456 789">+990 123 456 789</a>
            <a href='mailto:info@email.com'>info@email.com</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;