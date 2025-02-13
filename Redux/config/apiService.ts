import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_URL, // Use environment variable for base URL
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
