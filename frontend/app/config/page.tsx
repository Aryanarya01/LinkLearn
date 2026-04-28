import axios from "axios";

export const BASE_URL = "localhost:9090";
export const clientServer = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
