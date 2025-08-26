import AxiosClient from "@/axio-client/axios-client";
import { Appointment, AppointmentForm } from "./../types/IAppointment";

import { AxiosError } from "axios";

const createAppointment = async (data: AppointmentForm) => {
  try {
    const result = await AxiosClient.post("/appointment", data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred during login");
  }
};

const getAppointmentById = async (): Promise<Appointment[]> => {
  const result = await AxiosClient.get("/appointments/patient");

  return result.data.responseData;
};

export default {
  createAppointment,
  getAppointmentById,
};
