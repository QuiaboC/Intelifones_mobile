import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  async (config) => {
    let token = null;

    if (Platform.OS === "web") {
      token = localStorage.getItem("@token"); 
    } else {
      token = await AsyncStorage.getItem("@token"); 
    }

    console.log("token:", token);

    if (token && token.split(".").length === 3) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;