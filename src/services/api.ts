import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const apiWithAuth = axios.create({
  baseURL: "http://localhost:8080",
});

apiWithAuth.interceptors.request.use(function (config: any) {
  const auth = localStorage.getItem("@game");

  if (!auth) return (window.location.href = "/login");

  if (auth) {
    const parseAuth = JSON.parse(auth);
    config.headers["Authorization"] = `Bearer ${parseAuth.token}`;
  }

  return config;
});

apiWithAuth.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("@game");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
