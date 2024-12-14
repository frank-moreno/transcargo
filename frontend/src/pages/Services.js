import React, { useEffect, useState } from "react";
import axios from "axios";

const Services = ({ pageId }) => {
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
    return <p class="container">Loading...</p>;
  }

  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
};

export default Services;