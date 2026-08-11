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

import { bookAppointment } from "../../services/appointmentService";
import { getPatientsWithPagination } from "../../services/patientService";
import { getDoctorsWithPagination } from "../../services/doctorService";

function AppointmentForm({ open, onClose, onSuccess }) {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "BOOKED",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // LOAD PATIENTS & DOCTORS
  // =========================
  const loadData = async () => {
    try {
      setError("");

      const [patientData, doctorData] = await Promise.all([
        getPatientsWithPagination(0, 100, "id", "asc"),
        getDoctorsWithPagination(0, 100, "id", "asc"),
      ]);

      setPatients(patientData?.content || []);
      setDoctors(doctorData?.content || []);
    } catch (error) {
      console.error("Appointment Form Load Error:", error);
      setError("Unable to load patients or doctors.");
    }
  };

  useEffect(() => {
    if (open) {
      loadData();

      setFormData({
        patientId: "",
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        status: "BOOKED",
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
        !formData.patientId ||
        !formData.doctorId ||
        !formData.appointmentDate ||
        !formData.appointmentTime
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await bookAppointment({
        patientId: Number(formData.patientId),
        doctorId: Number(formData.doctorId),
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        status: formData.status,
      });

      onSuccess();
    } catch (error) {
      console.error("Book Appointment Error:", error);

      const message =
          error?.response?.data?.message || "Unable to book appointment.";

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
        <DialogTitle>Book Appointment</DialogTitle>

        <DialogContent>
          {error && (
              <Alert severity="error" sx={{ mb: 2, mt: 1 }}>
                {error}
              </Alert>
          )}

          {/* =========================
            PATIENT
        ========================= */}
          <TextField
              select
              fullWidth
              required
              label="Patient"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              margin="normal"
          >
            {patients.length > 0 ? (
                patients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.lastName} — ID: {patient.id}
                    </MenuItem>
                ))
            ) : (
                <MenuItem disabled>No patients found</MenuItem>
            )}
          </TextField>

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
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.name} — {doctor.specialization}
                    </MenuItem>
                ))
            ) : (
                <MenuItem disabled>No doctors found</MenuItem>
            )}
          </TextField>

          {/* =========================
            APPOINTMENT DATE
        ========================= */}
          <TextField
              fullWidth
              required
              type="date"
              label="Appointment Date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              margin="normal"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
          />

          {/* =========================
            APPOINTMENT TIME
        ========================= */}
          <TextField
              fullWidth
              required
              type="time"
              label="Appointment Time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              margin="normal"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
          />

          {/* =========================
            STATUS
        ========================= */}
          <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              margin="normal"
          >
            <MenuItem value="BOOKED">BOOKED</MenuItem>
            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
            <MenuItem value="CANCELLED">CANCELLED</MenuItem>
          </TextField>
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
            {loading ? "Booking..." : "Book Appointment"}
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default AppointmentForm;