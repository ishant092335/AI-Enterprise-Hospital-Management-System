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
} from "@mui/material";

import { addPrescription } from "../../services/prescriptionService";
import { getAppointments } from "../../services/appointmentService";

function PrescriptionForm({ open, onClose, onSuccess }) {
    const [appointments, setAppointments] = useState([]);

    const [formData, setFormData] = useState({
        appointmentId: "",
        diagnosis: "",
        medicines: "",
        notes: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =========================
    // LOAD APPOINTMENTS
    // =========================
    const loadAppointments = async () => {
        try {
            setError("");

            const data = await getAppointments();

            setAppointments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Prescription Appointment Load Error:", error);

            setError("Unable to load appointments.");
        }
    };

    // =========================
    // OPEN FORM
    // =========================
    useEffect(() => {
        if (open) {
            loadAppointments();

            setFormData({
                appointmentId: "",
                diagnosis: "",
                medicines: "",
                notes: "",
            });

            setError("");
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
        if (
            !formData.appointmentId ||
            !formData.diagnosis.trim() ||
            !formData.medicines.trim()
        ) {
            setError(
                "Appointment, diagnosis and medicines are required."
            );
            return;
        }

        try {
            setLoading(true);
            setError("");

            await addPrescription({
                appointmentId: Number(formData.appointmentId),
                diagnosis: formData.diagnosis.trim(),
                medicines: formData.medicines.trim(),
                notes: formData.notes.trim(),
            });

            onSuccess();
        } catch (error) {
            console.error("Add Prescription Error:", error);

            const message =
                error?.response?.data?.message ||
                "Unable to add prescription.";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Add Prescription</DialogTitle>

            <DialogContent>
                {error && (
                    <Alert severity="error" sx={{ mb: 2, mt: 1 }}>
                        {error}
                    </Alert>
                )}

                {/* =========================
            APPOINTMENT
        ========================= */}
                <TextField
                    select
                    fullWidth
                    required
                    label="Appointment"
                    name="appointmentId"
                    value={formData.appointmentId}
                    onChange={handleChange}
                    margin="normal"
                >
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <MenuItem
                                key={appointment.id}
                                value={appointment.id}
                            >
                                Appointment #{appointment.id} —{" "}
                                {appointment.patient?.firstName || ""}{" "}
                                {appointment.patient?.lastName || ""}
                                {" — "}
                                {appointment.appointmentDate || ""}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>
                            No appointments found
                        </MenuItem>
                    )}
                </TextField>

                {/* =========================
            DIAGNOSIS
        ========================= */}
                <TextField
                    fullWidth
                    required
                    multiline
                    minRows={3}
                    label="Diagnosis"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    margin="normal"
                />

                {/* =========================
            MEDICINES
        ========================= */}
                <TextField
                    fullWidth
                    required
                    multiline
                    minRows={4}
                    label="Medicines"
                    name="medicines"
                    value={formData.medicines}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Example: Paracetamol 650mg - twice daily for 5 days"
                />

                {/* =========================
            NOTES
        ========================= */}
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    margin="normal"
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Add Prescription"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PrescriptionForm;