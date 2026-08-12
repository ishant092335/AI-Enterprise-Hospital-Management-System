import api from "./api";

// =========================
// CREATE MEDICAL RECORD
// =========================
export const createMedicalRecord = async (medicalRecord) => {
    const response = await api.post("/medical-records", medicalRecord);

    return response.data;
};

// =========================
// GET ALL MEDICAL RECORDS
// =========================
export const getMedicalRecords = async () => {
    const response = await api.get("/medical-records");

    return response.data;
};

// =========================
// GET MEDICAL RECORD BY ID
// =========================
export const getMedicalRecordById = async (id) => {
    const response = await api.get(`/medical-records/${id}`);

    return response.data;
};

// =========================
// GET MEDICAL RECORD BY APPOINTMENT
// =========================
export const getMedicalRecordByAppointment = async (appointmentId) => {
    const response = await api.get(
        `/medical-records/appointment/${appointmentId}`
    );

    return response.data;
};

// =========================
// DELETE MEDICAL RECORD
// =========================
export const deleteMedicalRecord = async (id) => {
    const response = await api.delete(`/medical-records/${id}`);

    return response.data;
};