import axios from 'axios';
import { Alert } from 'react-native';
import { API_URL, TOKEN_API } from "./keys"

const api = axios.create({  
  baseURL: API_URL,
  headers: {
    Authorization: TOKEN_API
  },
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    
    if(error.request) {
      Alert.alert("Error", "Connection error!");
    }

  }
)

export default api;