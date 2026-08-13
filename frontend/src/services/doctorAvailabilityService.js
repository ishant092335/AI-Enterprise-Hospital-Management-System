import api from "./api";

// =========================
// GET ALL AVAILABILITY
// =========================
export const getAllAvailability = async () => {
    const response = await api.get("/availability");
    return response.data;
};

// =========================
// GET AVAILABILITY BY ID
// =========================
export const getAvailabilityById = async (id) => {
    const response = await api.get(`/availability/${id}`);
    return response.data;
};

// =========================
// ADD DOCTOR AVAILABILITY
// =========================
export const addAvailability = async (availability) => {
    const response = await api.post("/availability", availability);
    return response.data;
};

// =========================
// GET BY DOCTOR
// =========================
export const getAvailabilityByDoctor = async (doctorId) => {
    const response = await api.get(
        `/availability/doctor/${doctorId}`
    );

    return response.data;
};

// =========================
// GET BY DOCTOR + DAY
// =========================
export const getAvailabilityByDoctorAndDay = async (
    doctorId,
    day
) => {
    const response = await api.get(
        `/availability/doctor/${doctorId}/${day}`
    );

    return response.data;
};

// =========================
// DELETE AVAILABILITY
// =========================
export const deleteAvailability = async (id) => {
    const response = await api.delete(
        `/availability/${id}`
    );

    return response.data;
};