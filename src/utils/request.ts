import axios from "axios";
import store from "@/store";
const request = axios.create({});

request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const { user } = store.state;
    if (user && user.access_token) {
      config.headers.Authorization = user.access_token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default request;
