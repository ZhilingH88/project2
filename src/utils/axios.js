import axios from "axios";
import { refreshToken } from "../features/user/userSlice";
// import { store } from "../store";
axios.defaults.withCredentials = true;
const customFetch = axios.create({
  baseURL: "http://localhost:8000/",
});
const privateFetch = axios.create({
  baseURL: "http://localhost:8000/",
});

export { customFetch, privateFetch };
