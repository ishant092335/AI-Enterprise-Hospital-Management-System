import api from "./api";

// =========================
// GET ALL PRESCRIPTIONS
// =========================
export const getPrescriptions = async () => {
    const response = await api.get("/prescriptions");
    return response.data;
};

// =========================
// GET PRESCRIPTION BY ID
// =========================
export const getPrescriptionById = async (id) => {
    const response = await api.get(`/prescriptions/${id}`);
    return response.data;
};

// =========================
// GET PRESCRIPTION BY APPOINTMENT
// =========================
export const getPrescriptionByAppointment = async (appointmentId) => {
    const response = await api.get(
        `/prescriptions/appointment/${appointmentId}`
    );
    return response.data;
};

// =========================
// ADD PRESCRIPTION
// =========================
export const addPrescription = async (prescription) => {
    const response = await api.post("/prescriptions", prescription);
    return response.data;
};

// =========================
// DELETE PRESCRIPTION
// =========================
export const deletePrescription = async (id) => {
    const response = await api.delete(`/prescriptions/${id}`);
    return response.data;
};