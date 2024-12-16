import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [siteLogo, setSiteLogo] = useState('');
  const [activePath, setActivePath] = useState('/'); // Activo por defecto en la raíz
  const API_BASE_URL = 'http://localhost:8000/wp-json';
  const location = useLocation();

  // Fetch data (menu items and logo)
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/menus/v1/menus/primary`);
        const adjustedMenuItems = response.data.items.map((item) => ({
          ...item,
          url: new URL(item.url).pathname, // Convierte URLs absolutas en relativas
        }));
        setMenuItems(adjustedMenuItems);

        // Si la ruta actual no está en el menú, asignar el primer elemento como activo
        if (adjustedMenuItems.length > 0 && !adjustedMenuItems.some((item) => item.url === location.pathname)) {
          setActivePath(adjustedMenuItems[0].url);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    const fetchSiteInfo = async () => {
      try {
        const logoId = 46; // Replace with the actual logo ID
        const response = await axios.get(`${API_BASE_URL}/wp/v2/media/${logoId}`);
        setSiteLogo(response.data.source_url);
      } catch (error) {
        console.error('Error fetching site logo:', error);
      }
    };

    fetchMenuItems();
    fetchSiteInfo();
  }, [location.pathname]);

  // Soluciona el problema del logo perdiendo la clase activa
  useEffect(() => {
    if (location.pathname === '/') {
      setActivePath('/');
    }
  }, [location.pathname]);

  // Manejo de clics en el logo y enlaces
  const handleLinkClick = (url) => {
    setActivePath(url);
  };

  // Determina la clase activa
  const getActiveClass = (url) => (activePath === url ? 'active' : '');

  return (
    <header className="header p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">

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
          <ul className="nav col-12 col-lg-auto me-lg-auto ms-lg-auto mb-2 justify-content-center mb-md-0">
            {menuItems.map((item) => (
              <li key={item.id}>
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

          <div className="text-end">
            <a href="tel:+990123456789" className='btn btn-outline'>+990 123 456 789</a>
            <a href="mailto:info@email.com" className='btn btn-email'></a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;