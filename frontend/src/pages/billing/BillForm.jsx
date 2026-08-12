import { useEffect, useState } from "react";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Typography,
    Box,
} from "@mui/material";

import { generateBill } from "../../services/billingService";
import { getAppointments } from "../../services/appointmentService";

function BillForm({ open, onClose, onSuccess }) {
    const [appointments, setAppointments] = useState([]);

    const [formData, setFormData] = useState({
        appointmentId: "",
        consultationFee: "",
        medicineFee: "",
        labFee: "",
        otherCharges: "",
        discount: "",
        tax: "",
        paymentMethod: "CASH",
        paymentStatus: "PENDING",
    });

    const [loading, setLoading] = useState(false);
    const [loadingAppointments, setLoadingAppointments] = useState(false);
    const [error, setError] = useState("");

    // =========================
    // LOAD APPOINTMENTS
    // =========================
    const loadAppointments = async () => {
        try {
            setLoadingAppointments(true);
            setError("");

            const response = await getAppointments();

            const data = response?.data ?? response;

            setAppointments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Load Appointments Error:", error);
            setError("Unable to load appointments.");
        } finally {
            setLoadingAppointments(false);
        }
    };

    // =========================
    // OPEN FORM
    // =========================
    useEffect(() => {
        if (open) {
            setFormData({
                appointmentId: "",
                consultationFee: "",
                medicineFee: "",
                labFee: "",
                otherCharges: "",
                discount: "",
                tax: "",
                paymentMethod: "CASH",
                paymentStatus: "PENDING",
            });

            setError("");

            loadAppointments();
        }
    }, [open]);

    // =========================
    // HANDLE CHANGE
    // =========================
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================
    // SUBMIT
    // =========================
    const handleSubmit = async () => {
        if (!formData.appointmentId) {
            setError("Please select an appointment.");
            return;
        }

        if (
            formData.consultationFee === "" ||
            formData.medicineFee === "" ||
            formData.labFee === "" ||
            formData.otherCharges === "" ||
            formData.discount === "" ||
            formData.tax === ""
        ) {
            setError("Please fill all fee fields.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await generateBill({
                appointmentId: Number(formData.appointmentId),

                consultationFee: Number(formData.consultationFee),
                medicineFee: Number(formData.medicineFee),
                labFee: Number(formData.labFee),
                otherCharges: Number(formData.otherCharges),
                discount: Number(formData.discount),
                tax: Number(formData.tax),

                paymentMethod: formData.paymentMethod,
                paymentStatus: formData.paymentStatus,
            });

            onSuccess();
        } catch (error) {
            console.error("Generate Bill Error:", error);

            const message =
                error?.response?.data?.message ||
                "Unable to generate bill.";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // CALCULATE PREVIEW TOTAL
    // =========================
    const consultation = Number(formData.consultationFee) || 0;
    const medicine = Number(formData.medicineFee) || 0;
    const lab = Number(formData.labFee) || 0;
    const other = Number(formData.otherCharges) || 0;
    const discount = Number(formData.discount) || 0;
    const tax = Number(formData.tax) || 0;

    const totalAmount =
        consultation +
        medicine +
        lab +
        other +
        tax -
        discount;

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Generate Bill</DialogTitle>

            <DialogContent>
                {error && (
                    <Alert severity="error" sx={{ mb: 2, mt: 1 }}>
                        {error}
                    </Alert>
                )}

                {/* APPOINTMENT */}
                <TextField
                    select
                    fullWidth
                    required
                    label="Appointment"
                    name="appointmentId"
                    value={formData.appointmentId}
                    onChange={handleChange}
                    margin="normal"
                    disabled={loading || loadingAppointments}
                >
                    {loadingAppointments ? (
                        <MenuItem disabled>
                            Loading appointments...
                        </MenuItem>
                    ) : appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <MenuItem
                                key={appointment.id}
                                value={appointment.id}
                            >
                                Appointment #{appointment.id} —{" "}
                                {appointment.patient?.firstName}{" "}
                                {appointment.patient?.lastName} —{" "}
                                {appointment.doctor?.name} —{" "}
                                {appointment.appointmentDate}{" "}
                                {appointment.appointmentTime}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>
                            No appointments found
                        </MenuItem>
                    )}
                </TextField>

                {/* CONSULTATION */}
                <TextField
                    fullWidth
                    required
                    type="number"
                    label="Consultation Fee"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    margin="normal"
                    inputProps={{ min: 0 }}
                    disabled={loading}
                />

                {/* MEDICINE */}
                <TextField
                    fullWidth
                    required
                    type="number"
                    label="Medicine Fee"
                    name="medicineFee"
                    value={formData.medicineFee}
                    onChange={handleChange}
                    margin="normal"
                    inputProps={{ min: 0 }}
                    disabled={loading}
                />

                {/* LAB */}
                <TextField
                    fullWidth
                    required
                    type="number"
                    label="Lab Fee"
                    name="labFee"
                    value={formData.labFee}
                    onChange={handleChange}
                    margin="normal"
                    inputProps={{ min: 0 }}
                    disabled={loading}
                />

                {/* OTHER */}
                <TextField
                    fullWidth
                    required
                    type="number"
                    label="Other Charges"
                    name="otherCharges"
                    value={formData.otherCharges}
                    onChange={handleChange}
                    margin="normal"
                    inputProps={{ min: 0 }}
                    disabled={loading}
                />

                {/* DISCOUNT */}
                <TextField
                    fullWidth
                    required
                    type="number"
                    label="Discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    margin="normal"
                    inputProps={{ min: 0 }}
                    disabled={loading}
                />

                {/* TAX */}
                <TextField
                    fullWidth
                    required
                    type="number"
                    label="Tax"
                    name="tax"
                    value={formData.tax}
                    onChange={handleChange}
                    margin="normal"
                    inputProps={{ min: 0 }}
                    disabled={loading}
                />

                {/* PAYMENT METHOD */}
                <TextField
                    select
                    fullWidth
                    required
                    label="Payment Method"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    margin="normal"
                    disabled={loading}
                >
                    <MenuItem value="CASH">CASH</MenuItem>
                    <MenuItem value="UPI">UPI</MenuItem>
                    <MenuItem value="CARD">CARD</MenuItem>
                    <MenuItem value="NET_BANKING">
                        NET BANKING
                    </MenuItem>
                </TextField>

                {/* PAYMENT STATUS */}
                <TextField
                    select
                    fullWidth
                    required
                    label="Payment Status"
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                    margin="normal"
                    disabled={loading}
                >
                    <MenuItem value="PENDING">PENDING</MenuItem>
                    <MenuItem value="PAID">PAID</MenuItem>
                </TextField>

                {/* TOTAL PREVIEW */}
                <Box
                    sx={{
                        mt: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "#f5f7fb",
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                    >
                        Total Amount: ₹{totalAmount.toFixed(2)}
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading || loadingAppointments}
                >
                    {loading ? "Generating..." : "Generate Bill"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default BillForm;