import axios from "axios";

// Function to get token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Create a new Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to set Authorization header dynamically before each request is sent
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
