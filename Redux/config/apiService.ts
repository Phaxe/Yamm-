import axios from "axios";

// Create an Axios instance with a predefined configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_URL, // Use environment variable for base URL
});

api.interceptors.request.use(
  (config) => {
    // You can modify the request config here (e.g., add authentication headers)
    return config;
  },
  (error) => {
    // Handle request errors before they are sent
    return Promise.reject(error);
  }
);

export default api;
