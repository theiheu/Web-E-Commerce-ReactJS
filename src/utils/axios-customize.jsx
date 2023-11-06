import axios from "axios";

const baseUrl = import.meta.env.VITE_SERVER_URL;

const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const handleRefreshToken = async () => {
  const res = await instance.get("/api/v1/auth/refresh");
  if (res && res.data) return res?.data?.data?.access_token;
  else null;
};

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

const NO_RETRY_HEADER = "x-no-retry";

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const access_token = await handleRefreshToken();

      error.config.headers[NO_RETRY_HEADER] = "true";
      if (access_token) {
        error.config.headers["Authorization"] = `Bearer ${access_token}`;
        localStorage.setItem("access_token", access_token);
        return instance.request(error.config);
      }
    }

    return error?.response?.data ?? Promise.reject(error);
  }
);

instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("access_token")}`;

export default instance;
