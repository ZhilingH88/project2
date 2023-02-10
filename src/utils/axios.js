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



// privateFetch.interceptors.request.use(
//   async (config) => {
//     const currentDate = new Date();
//     if (expireTime * 1000 < currentDate.getTime()) {
//       const resp = await customFetch.get("/users/token");
//       config.headers.Authorization = `Bearer ${resp.data.accessToken}`;
//       setAccessToken(resp.data.accessToken);
//       const decoded = jwtDecode(resp.data.accessToken);
//       setExpireTime(decoded.exp);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export { customFetch, privateFetch };
