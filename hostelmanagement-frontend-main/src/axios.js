import axios from "axios";

const baseURL = "http://localhost:8181";

const instance = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type':'application/json' }
});



export default instance;
