import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/wp-json/custom/v1",
});

// Fetch posts with optional parameters and pagination
export const fetchCustomPosts = async ({ category, author, startDate, endDate, perPage = 10, page = 1 }) => {
  try {
    const response = await API.get("/posts", {
      params: {
        category,
        author,
        start_date: startDate,
        end_date: endDate,
        per_page: perPage,
        page,
      },
    });
    return response.data; // Contains posts, current_page, and total_pages
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], current_page: 1, total_pages: 1 };
  }
};