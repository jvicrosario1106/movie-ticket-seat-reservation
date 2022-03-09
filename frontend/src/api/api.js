import axios from "axios";

export const API_URL = axios.create({
  baseURL: "https://cinephileserver.herokuapp.com",
});
