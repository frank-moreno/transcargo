import React from 'react';
import PostList from "../components/Posts/PostList";
import "./../styles/main.scss";

const Home = () => {
  return (
    <div className="homepage container">
      <h1>Welcome to My Blog</h1>
      <PostList />
    </div>
  );
};

export default Home;