import axios from 'axios';
import { API_URL, TOKEN_API } from "./keys"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: TOKEN_API
  },
});

export default api;