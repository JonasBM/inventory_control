import axios from "axios";
import "./index.css";

const noLoading = ["thiswontloadindicator/"];

axios.interceptors.request.use(
  function (config) {
    if (config.url && process.env.REACT_APP_API_URL) {
      if (
        !noLoading.includes(
          config.url.replace(process.env.REACT_APP_API_URL, "")
        )
      ) {
        document.body.classList.add("loading-indicator");
      }
    }
    return config;
  },
  function (error) {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    document.body.classList.remove("loading-indicator");
    return response;
  },
  function (error) {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);
