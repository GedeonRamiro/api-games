import axios from "axios";

export const urlApi = "http://localhost:8080";

const api = axios.create({
  baseURL: urlApi,
});

export const apiWithAuth = axios.create({
  baseURL: urlApi,
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
