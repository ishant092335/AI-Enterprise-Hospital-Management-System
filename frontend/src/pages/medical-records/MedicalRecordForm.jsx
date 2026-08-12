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

import {
    createMedicalRecord,
} from "../../services/medicalRecordService";

import {
    getAppointments,
} from "../../services/appointmentService";

function MedicalRecordForm({ open, onClose, onSuccess }) {
    const [appointments, setAppointments] = useState([]);

    const [formData, setFormData] = useState({
        appointmentId: "",
        symptoms: "",
        diagnosis: "",
        treatment: "",
        remarks: "",
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

            const data = await getAppointments();

            setAppointments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(
                "Medical Record Appointment Load Error:",
                error
            );

            setError("Unable to load appointments.");
            setAppointments([]);
        } finally {
            setLoadingAppointments(false);
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
                symptoms: "",
                diagnosis: "",
                treatment: "",
                remarks: "",
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
            !formData.symptoms.trim() ||
            !formData.diagnosis.trim()
        ) {
            setError(
                "Appointment, symptoms and diagnosis are required."
            );

            return;
        }

        try {
            setLoading(true);
            setError("");

            await createMedicalRecord({
                appointment: {
                    id: Number(formData.appointmentId),
                },

                symptoms: formData.symptoms.trim(),

                diagnosis: formData.diagnosis.trim(),

                treatment: formData.treatment.trim(),

                remarks: formData.remarks.trim(),
            });

            onSuccess();
        } catch (error) {
            console.error(
                "Create Medical Record Error:",
                error
            );

            const message =
                error?.response?.data?.message ||
                "Unable to create medical record.";

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
            <DialogTitle>
                Add Medical Record
            </DialogTitle>

            <DialogContent>
                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            mb: 2,
                            mt: 1,
                        }}
                    >
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
                    disabled={loading || loadingAppointments}
                    helperText={
                        loadingAppointments
                            ? "Loading appointments..."
                            : "Select the appointment for this medical record"
                    }
                >
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <MenuItem
                                key={appointment.id}
                                value={appointment.id}
                            >
                                Appointment #{appointment.id} —{" "}
                                {appointment.patient?.firstName || ""}{" "}
                                {appointment.patient?.lastName || ""} —{" "}
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
            SYMPTOMS
        ========================= */}
                <TextField
                    fullWidth
                    required
                    multiline
                    minRows={3}
                    label="Symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    margin="normal"
                    disabled={loading}
                    placeholder="Enter patient symptoms"
                />

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
                    disabled={loading}
                    placeholder="Enter diagnosis"
                />

                {/* =========================
            TREATMENT
        ========================= */}
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Treatment"
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleChange}
                    margin="normal"
                    disabled={loading}
                    placeholder="Enter treatment details"
                />

                {/* =========================
            REMARKS
        ========================= */}
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    margin="normal"
                    disabled={loading}
                    placeholder="Enter additional remarks"
                />
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
                    {loading ? "Saving..." : "Save Medical Record"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MedicalRecordForm;