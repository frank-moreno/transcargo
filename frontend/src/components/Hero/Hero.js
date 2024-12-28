import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Hero = () => {
  const [data, setData] = useState({ title: '', breadcrumbs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        // Extraer el slug desde la URL
        const slug = location.pathname.replace('/', '').replace(/\/$/, '') || 'home';

        // Llamar al endpoint de WordPress
        const response = await axios.get(
          `http://localhost:8000/wp-json/custom/v1/page-data/${slug}`
        );

        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching the page data');
        console.error(err);
        setLoading(false);
      }
    };

    fetchPageData();
  }, [location]);

  if (loading) return <div className="hero">Loading...</div>;
  if (error) return <div className="hero">Error: {error}</div>;

  return (
    <div className="hero">
        <div className="container">
            <h1 className="page-title">{data.title}</h1>
            <nav className="breadcrumb">
                {data.breadcrumbs.map((crumb, index) => (
                    <span key={index}>
                    {crumb.title}
                    {index < data.breadcrumbs.length - 1 && ' > '}
                    </span>
                ))}
            </nav>
        </div>
    </div>
  );
};

export default Hero;