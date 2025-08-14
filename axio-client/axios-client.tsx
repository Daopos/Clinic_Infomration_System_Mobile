import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";

const AxiosClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

AxiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const response = error.response;

    if (response?.status === 401) {
      await AsyncStorage.removeItem("token");
      // Trigger logout state change
    }

    return Promise.reject(error);
  }
);

export default AxiosClient;
