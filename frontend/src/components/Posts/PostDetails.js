import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { slug } = useParams(); // Obtén el slug desde la URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/wp-json/wp/v2/posts?slug=${slug}`);
        if (response.data.length > 0) {
          setPost(response.data[0]); // Usamos el primer resultado porque el slug es único
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) {
    return <p className="container">Loading...</p>;
  }

  return (
    <div className="container">
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
};

export default PostDetail;