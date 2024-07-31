import axios from "axios";
import { DELIVER_JOKE_API_BASE_URL, MODERATE_JOKE_API_BASE_URL, SUBMIT_JOKE_API_BASE_URL } from "../constants/apiConstants";
import { token_constants } from "../constants/generalConstants";

export const deliverJokeService = axios.create({
  baseURL: DELIVER_JOKE_API_BASE_URL,
});
export const submitJokeService = axios.create({
  baseURL: SUBMIT_JOKE_API_BASE_URL,
});
export const moderateJokeService = axios.create({
  baseURL: MODERATE_JOKE_API_BASE_URL,
});

moderateJokeService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(token_constants.ACCESS_TOKEN);
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
