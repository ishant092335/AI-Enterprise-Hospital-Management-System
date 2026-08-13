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

import { addAvailability } from "../../services/doctorAvailabilityService";
import { getDoctorsWithPagination } from "../../services/doctorService";

const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
];

function DoctorAvailabilityForm({ open, onClose, onSuccess }) {
    const [doctors, setDoctors] = useState([]);

    const [formData, setFormData] = useState({
        doctorId: "",
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        slotDuration: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =========================
    // LOAD DOCTORS
    // =========================
    const loadDoctors = async () => {
        try {
            setError("");

            const data = await getDoctorsWithPagination(
                0,
                100,
                "id",
                "asc"
            );

            setDoctors(data?.content || []);
        } catch (error) {
            console.error("Load Doctors Error:", error);
            setError("Unable to load doctors.");
        }
    };

    // =========================
    // RESET FORM WHEN OPEN
    // =========================
    useEffect(() => {
        if (open) {
            loadDoctors();

            setFormData({
                doctorId: "",
                dayOfWeek: "",
                startTime: "",
                endTime: "",
                slotDuration: "",
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
            !formData.doctorId ||
            !formData.dayOfWeek ||
            !formData.startTime ||
            !formData.endTime ||
            !formData.slotDuration
        ) {
            setError("Please fill all required fields.");
            return;
        }

        if (formData.endTime <= formData.startTime) {
            setError("End time must be after start time.");
            return;
        }

        if (Number(formData.slotDuration) <= 0) {
            setError("Slot duration must be greater than 0.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            // IMPORTANT:
            // Backend expects:
            //
            // {
            //   "doctor": {
            //      "id": 1
            //   },
            //   "dayOfWeek": "TUESDAY",
            //   "startTime": "11:06",
            //   "endTime": "14:26",
            //   "slotDuration": 10
            // }
            //
            // NOT:
            // {
            //   "doctorId": 1
            // }

            await addAvailability({
                doctor: {
                    id: Number(formData.doctorId),
                },
                dayOfWeek: formData.dayOfWeek,
                startTime: formData.startTime,
                endTime: formData.endTime,
                slotDuration: Number(formData.slotDuration),
            });

            onSuccess();
        } catch (error) {
            console.error("Add Availability Error:", error);

            const message =
                error?.response?.data?.message ||
                error?.response?.data ||
                "Unable to add doctor availability.";

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
                Add Doctor Availability
            </DialogTitle>

            <DialogContent>
                {error && (
                    <Alert severity="error" sx={{ mt: 1, mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* =========================
                    DOCTOR
                ========================= */}
                <TextField
                    select
                    fullWidth
                    required
                    label="Doctor"
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                    margin="normal"
                >
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <MenuItem
                                key={doctor.id}
                                value={doctor.id}
                            >
                                {doctor.name} — {doctor.specialization}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>
                            No doctors found
                        </MenuItem>
                    )}
                </TextField>

                {/* =========================
                    DAY
                ========================= */}
                <TextField
                    select
                    fullWidth
                    required
                    label="Day"
                    name="dayOfWeek"
                    value={formData.dayOfWeek}
                    onChange={handleChange}
                    margin="normal"
                >
                    {days.map((day) => (
                        <MenuItem key={day} value={day}>
                            {day}
                        </MenuItem>
                    ))}
                </TextField>

                {/* =========================
                    START TIME
                ========================= */}
                <TextField
                    fullWidth
                    required
                    type="time"
                    label="Start Time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    margin="normal"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />

                {/* =========================
                    END TIME
                ========================= */}
                <TextField
                    fullWidth
                    required
                    type="time"
                    label="End Time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    margin="normal"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />

                {/* =========================
                    SLOT DURATION
                ========================= */}
                <TextField
                    fullWidth
                    required
                    type="number"
                    label="Slot Duration (minutes)"
                    name="slotDuration"
                    value={formData.slotDuration}
                    onChange={handleChange}
                    margin="normal"
                    inputProps={{
                        min: 1,
                    }}
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
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Add Availability"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DoctorAvailabilityForm;