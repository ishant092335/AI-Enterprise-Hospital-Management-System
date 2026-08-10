import api from "./api";

// Get all active patients
export const getPatients = async () => {
  const response = await api.get("/patients");
  return response.data.data;
};

// Add patient
export const addPatient = async (patient) => {
  const response = await api.post("/patients", patient);
  return response.data.data;
};

// Get patient by ID
export const getPatientById = async (id) => {
  const response = await api.get(`/patients/${id}`);
  return response.data.data;
};

// Update patient
export const updatePatient = async (id, patient) => {
  const response = await api.put(`/patients/${id}`, patient);
  return response.data.data;
};

// Delete patient
export const deletePatient = async (id) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
};

// Search patients
export const searchPatients = async (keyword) => {
  const response = await api.get("/patients/search", {
    params: { keyword },
  });

  return response.data.data;
};

// Get paginated patients
export const getPatientsWithPagination = async (
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "asc",
) => {
  const response = await api.get("/patients/pagination", {
    params: {
      page,
      size,
      sortBy,
      sortDir,
    },
  });

  return response.data.data;
};
