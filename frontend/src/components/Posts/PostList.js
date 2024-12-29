import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCustomPosts } from "../../services/api";
import "./PostList.scss";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = async (page = 1) => {
    try {
      const { posts, currentPage, totalPages } = await fetchCustomPosts({ perPage: 5, page });
      setPosts(posts);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  useEffect(() => {
    loadPosts(1);
  }, []);

  return (
    <div className="post-list">
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post-card">
            {post.featured_image && (
              <img src={post.featured_image} alt={post.title.rendered || post.title} />
            )}
            <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered || post.title }} />
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered || post.excerpt }} />
            {/* Link dinámico con solución de respaldo */}
            <Link to={post.slug ? `/post/${post.slug}` : `/post/${post.id}`} className="read-more">
              Read More
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => loadPosts(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => loadPosts(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;