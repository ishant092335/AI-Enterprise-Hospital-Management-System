import api from "./api";

// =========================
// GET ALL BILLS
// =========================
export const getBills = async () => {
    const response = await api.get("/bills");
    return response.data;
};

// =========================
// GET BILL BY ID
// =========================
export const getBillById = async (id) => {
    const response = await api.get(`/bills/${id}`);
    return response.data;
};

// =========================
// GET BILL BY APPOINTMENT
// =========================
export const getBillByAppointment = async (appointmentId) => {
    const response = await api.get(`/bills/appointment/${appointmentId}`);
    return response.data;
};

// =========================
// GENERATE BILL
// =========================
export const generateBill = async (billData) => {
    const response = await api.post("/bills", billData);
    return response.data;
};

// =========================
// DELETE BILL
// =========================
export const deleteBill = async (id) => {
    const response = await api.delete(`/bills/${id}`);
    return response.data;
};