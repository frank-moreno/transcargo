import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
            Headless Wordpress
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link className="nav-link px-2 link-secondary" to="/">Home</Link></li>
            <li><Link className="nav-link px-2 link-body-emphasis" to="/about">About</Link></li>
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