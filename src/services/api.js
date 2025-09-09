import axios from "axios";

const api = axios.create({
  baseURL: "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;