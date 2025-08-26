export interface AppointmentForm {
  services: string;
  app_date: string;
}

export interface Appointment {
  id: number;
  services: string;
  status: string;
  app_date: string;
  createdAt: string;
}
