import React, { useEffect, useState } from "react";
import axios from "axios";

const About = ({ pageId }) => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/wp-json/wp/v2/pages/${pageId}`);
        setPage(response.data);
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    };

    fetchPage();
  }, [pageId]);

  if (!page) {
    return <p className="container">Loading...</p>;
  }

  return (
    <div className="container">
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
};

export default About;