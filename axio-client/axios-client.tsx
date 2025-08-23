import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";

const AxiosClient = axios.create({
  baseURL: "http://192.168.1.9:3000/api/v1",

  // baseURL: "http://localhost:3000/api/v1",
});

// 🔑 Add token before every request
AxiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const response = error.response;

    if (response?.status === 401) {
      await AsyncStorage.removeItem("token");
      // 🔥 you can also trigger logout here if needed
    }

    return Promise.reject(error);
  }
);

export default AxiosClient;
