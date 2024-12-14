import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './bootstrap.js';
import './styles/main.scss';
import './styles/block-library/style.min.css';
// import 'leaflet/dist/leaflet.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
    document.getElementById("root")
);