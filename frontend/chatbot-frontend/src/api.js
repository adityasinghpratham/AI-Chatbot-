import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8080", // backend URL
  headers: {
    "Content-Type": "application/json",
  },
});
