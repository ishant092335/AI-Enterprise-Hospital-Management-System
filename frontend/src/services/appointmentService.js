import api from "./api";

// Get all appointments
export const getAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data;
};

// Get appointment by ID
export const getAppointmentById = async (id) => {
  const response = await api.get(`/appointments/${id}`);
  return response.data;
};

// Add appointment
export const addAppointment = async (appointment) => {
  const response = await api.post("/appointments", appointment);
  return response.data;
};

// Book appointment
export const bookAppointment = async (appointment) => {
  const response = await api.post("/appointments/book", appointment);
  return response.data;
};

// Delete appointment
export const deleteAppointment = async (id) => {
  const response = await api.delete(`/appointments/${id}`);
  return response.data;
};
