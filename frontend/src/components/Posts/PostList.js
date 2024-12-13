import React, { useEffect, useState } from "react";
import { fetchCustomPosts } from "../../services/api";
import "./PostList.scss";

const PostList = ({ category, author, startDate, endDate }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = async (page = 1) => {
    const data = await fetchCustomPosts({ category, author, startDate, endDate, perPage: 5, page });
    setPosts(data.posts);
    setCurrentPage(data.current_page);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    loadPosts();
  }, [category, author, startDate, endDate]);

  return (
    <div className="post-list">
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post-card">
            {post.featured_image && <img src={post.featured_image} alt={post.title} />}
            <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
            <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            <a href={post.link} className="read-more">
              Read More
            </a>
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