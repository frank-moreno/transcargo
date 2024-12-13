import axios from "axios";

// Configuración base de la API
export const API = axios.create({
  baseURL: "http://localhost:8000/wp-json/custom/v1", // Base URL para los endpoints personalizados
});

// Función para obtener posts personalizados con filtros opcionales y paginación
export const fetchCustomPosts = async ({ category, author, startDate, endDate, perPage = 10, page = 1 }) => {
  try {
    const response = await API.get("/posts", {
      params: {
        category, // ID o slug de la categoría
        author, // ID del autor
        start_date: startDate, // Fecha inicial (formato YYYY-MM-DD)
        end_date: endDate, // Fecha final (formato YYYY-MM-DD)
        per_page: perPage, // Número de posts por página
        page, // Número de la página
      },
    });

    const adjustedPosts = response.data.posts.map((post) => ({
      ...post,
      link: new URL(post.link).pathname, // Ajusta las URLs de los posts a rutas relativas
    }));

    return {
      posts: adjustedPosts, // Lista de posts con URLs relativas
      currentPage: response.data.current_page, // Página actual
      totalPages: response.data.total_pages, // Total de páginas disponibles
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], currentPage: 1, totalPages: 1 };
  }
};

// Función para obtener los elementos del menú desde WordPress
export const fetchMenuItems = async (menuSlug = "primary") => {
  try {
    const response = await API.get(`/menus/${menuSlug}`); // Ajusta el endpoint al slug de tu menú
    const adjustedMenuItems = response.data.items.map((item) => ({
      ...item,
      url: new URL(item.url).pathname, // Convierte URLs absolutas en relativas
    }));
    return adjustedMenuItems;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
};

// Función para obtener información del sitio, como el logo y el nombre
export const fetchSiteInfo = async () => {
  try {
    const response = await API.get("/site-info"); // Endpoint que devuelve información del sitio
    const { name, logo } = response.data; // Ajusta las claves según la respuesta de tu API
    return {
      siteName: name,
      siteLogo: logo || "",
    };
  } catch (error) {
    console.error("Error fetching site info:", error);
    return {
      siteName: "Default Site Name",
      siteLogo: "",
    };
  }
};