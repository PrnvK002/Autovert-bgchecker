import axios from "axios";

const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token")!)
  : "";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
