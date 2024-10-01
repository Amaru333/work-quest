import axios from "axios";
const httpRequest = axios.create();

httpRequest.interceptors.request.use(
  (config) => {
    // if (config.params?.auth !== false) {
    //   const token = getLocalStorageAuthToken();
    //   if (token) {
    //     config.headers["auth-token"] = token;
    //   }
    // }

    delete config.params?.auth;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpRequest;
