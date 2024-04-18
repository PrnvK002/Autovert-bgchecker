import axios from "axios";
const BASE_URL = "http://localhost:8000/api/v1";

function getCurrentAccessToken() {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token")!)
    : "";
  return token;
}

function createAxiosClient() {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use(
    (config) => {
      if (localStorage.getItem("token")) {
        const token = getCurrentAccessToken();
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
      }
      return config;
    },
    (error) => {
      console.error("interceptor error", error);
      return Promise.reject(error);
    }
  );

  return client;
}

const client = createAxiosClient();
export default client;
