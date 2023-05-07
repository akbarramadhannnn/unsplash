import axios from "axios";

const axiosInstanceDefault = axios.create({
  baseURL: process.env.REACT_APP_UNSPLASH_BASE_URL_API,
});

axiosInstanceDefault.interceptors.request.use(async (config) => {
  config.headers = {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
    Accept: "application/json",
  };
  return config;
});

axiosInstanceDefault.interceptors.response.use(
  async (response) => {
    return response.data;
  },
  async (error) => {
    return error;
  }
);

export default axiosInstanceDefault;
