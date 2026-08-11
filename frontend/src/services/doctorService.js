import api from "./api";

// Get all active doctors
export const getDoctors = async () => {
  const response = await api.get("/doctors");
  return response.data;
};

// Add doctor
export const addDoctor = async (doctor) => {
  const response = await api.post("/doctors", doctor);
  return response.data;
};

// Get doctor by ID
export const getDoctorById = async (id) => {
  const response = await api.get(`/doctors/${id}`);
  return response.data;
};

// Update doctor
export const updateDoctor = async (id, doctor) => {
  const response = await api.put(`/doctors/${id}`, doctor);
  return response.data;
};

// Delete doctor
export const deleteDoctor = async (id) => {
  const response = await api.delete(`/doctors/${id}`);
  return response.data;
};

// Search doctors
export const searchDoctors = async (keyword) => {
  const response = await api.get("/doctors/search", {
    params: { keyword },
  });

  return response.data;
};

// Pagination + sorting
export const getDoctorsWithPagination = async (
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "asc",
) => {
  const response = await api.get("/doctors/pagination", {
    params: {
      page,
      size,
      sortBy,
      sortDir,
    },
  });

  return response.data;
};

// Sort doctors by name
export const getDoctorsSortedByName = async () => {
  const response = await api.get("/doctors/sort");
  return response.data;
};
    