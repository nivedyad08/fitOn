import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://thefreshcart.shop/",
});
// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    Object.assign(config.headers, {
      authorization: `Bearer ${ Cookies.get("accessToken") }`,
    });
    // Do something before request is sent

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 403) {
      try {
        const refreshToken = Cookies.get("refreshToken");
        console.log(refreshToken);
        const refreshResponse = await axios.post("/api/auth/refresh", { refreshToken });
        if (refreshResponse.status === 200) {
          const { accessToken } = refreshResponse.data;
          Cookies.set("accessToken", accessToken);
          // Retry the original request with the updated access token
          const originalRequest = error.config;
          originalRequest.headers.authorization = `Bearer ${ accessToken }`;
          return axios(originalRequest);
        }
      } catch (error) {

      }
    }
    return Promise.reject(error);
  }
);

export default api;
