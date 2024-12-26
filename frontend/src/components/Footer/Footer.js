// Footer.js
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [footerContent, setFooterContent] = useState("");
  const apiUrl = "http://localhost:8000/wp-json/wp/v2/footer_content";

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Asegúrate de que el contenido existe
        if (data && data.length > 0) {
          setFooterContent(data[0].content.rendered); // Renderiza el primer post
        } else {
          setFooterContent("<p>No footer content found.</p>");
        }
      } catch (error) {
        console.error("Error fetching footer content:", error);
      }
    };

    fetchFooterContent();
  }, []);

  return (
    <footer
      className="footer-content"
      dangerouslySetInnerHTML={{ __html: footerContent }}
    ></footer>
  );
};

export default Footer;