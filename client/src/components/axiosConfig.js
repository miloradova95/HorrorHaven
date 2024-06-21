import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Adjust to your backend URL
  withCredentials: true, // Ensure credentials are sent with requests if needed
});

export default instance;