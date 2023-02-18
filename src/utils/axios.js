import axios from "axios";
import env from "react-dotenv";
axios.defaults.withCredentials = true;
const customFetch = axios.create({
  baseURL: env.BASE_URL,
});
const privateFetch = axios.create({
  baseURL: env.BASE_URL,
});

export { customFetch, privateFetch };
