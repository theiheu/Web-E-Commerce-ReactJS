import axios from "axios";

const instance = axios.create({
  baseURL: "https://online-gateway.ghn.vn/shiip/public-api/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

instance.defaults.headers.common["token"] = import.meta.env.VITE_API_TOKEN_GHN;
// instance.defaults.headers.common["Content-Type"] = "application/json";

export default instance;
