import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getAppointments,
  getAppointmentById,
  deleteAppointment,
} from "../../services/appointmentService";

import AppointmentForm from "./AppointmentForm";
import AppointmentDetails from "./AppointmentDetails";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [snackbar, setSnackbar] = useState("");

  // =========================
  // LOAD APPOINTMENTS
  // =========================
  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAppointments();

      setAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Appointments API Error:", error);

      setError("Unable to load appointments.");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // =========================
  // VIEW APPOINTMENT
  // =========================
  const handleView = async (appointment) => {
    try {
      const data = await getAppointmentById(appointment.id);

      setSelectedAppointment(data);
      setDetailsOpen(true);
    } catch (error) {
      console.error("Appointment Details Error:", error);
      setSnackbar("Unable to load appointment details.");
    }
  };

  // =========================
  // DELETE APPOINTMENT
  // =========================
  const handleDelete = async (appointment) => {
    const patientName = appointment.patient
      ? `${appointment.patient.firstName} ${appointment.patient.lastName}`
      : "this appointment";

    const confirmed = window.confirm(
      `Are you sure you want to delete the appointment for ${patientName}?`,
    );

    if (!confirmed) return;

    try {
      await deleteAppointment(appointment.id);

      setSnackbar("Appointment deleted successfully.");

      await loadAppointments();
    } catch (error) {
      console.error("Delete Appointment Error:", error);

      const message =
        error?.response?.data?.message || "Unable to delete appointment.";

      setSnackbar(message);
    }
  };

  // =========================
  // AFTER BOOKING
  // =========================
  const handleFormSuccess = async () => {
    setFormOpen(false);

    setSnackbar("Appointment booked successfully.");

    await loadAppointments();
  };

  // =========================
  // FORMAT STATUS
  // =========================
  const getStatusStyle = (status) => {
    if (status === "BOOKED") {
      return {
        color: "primary.main",
        fontWeight: "bold",
      };
    }

    if (status === "COMPLETED") {
      return {
        color: "success.main",
        fontWeight: "bold",
      };
    }

    if (status === "CANCELLED") {
      return {
        color: "error.main",
        fontWeight: "bold",
      };
    }

    return {
      fontWeight: "bold",
    };
  };

  return (
    <Box>
      {/* =========================
          HEADER
      ========================= */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Appointments
          </Typography>

          <Typography color="text.secondary">
            Manage hospital appointments
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadAppointments}
          >
            Refresh
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setFormOpen(true)}
          >
            Book Appointment
          </Button>
        </Box>
      </Box>

      {/* =========================
          ERROR
      ========================= */}
      {!loading && error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* =========================
          LOADING
      ========================= */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 8,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* =========================
          TABLE
      ========================= */}
      {!loading && !error && (
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>ID</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Patient</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Doctor</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Specialization</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Date</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Time</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>

                  <TableCell align="center">
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <TableRow key={appointment.id} hover>
                      <TableCell>{appointment.id}</TableCell>

                      <TableCell>
                        <Typography fontWeight="600">
                          {appointment.patient?.firstName}{" "}
                          {appointment.patient?.lastName}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          ID: {appointment.patient?.id}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography fontWeight="600">
                          {appointment.doctor?.name}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          ID: {appointment.doctor?.id}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {appointment.doctor?.specialization || "-"}
                      </TableCell>

                      <TableCell>{appointment.appointmentDate}</TableCell>

                      <TableCell>{appointment.appointmentTime}</TableCell>

                      <TableCell>
                        <Typography sx={getStatusStyle(appointment.status)}>
                          {appointment.status || "-"}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          title="View"
                          onClick={() => handleView(appointment)}
                        >
                          <VisibilityIcon />
                        </IconButton>

                        <IconButton
                          color="error"
                          title="Delete"
                          onClick={() => handleDelete(appointment)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Box sx={{ py: 5 }}>
                        <Typography variant="h6">
                          No appointments found
                        </Typography>

                        <Typography color="text.secondary">
                          Book an appointment to see it here.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* =========================
          BOOK APPOINTMENT FORM
      ========================= */}
      <AppointmentForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSuccess={handleFormSuccess}
      />

      {/* =========================
          APPOINTMENT DETAILS
      ========================= */}
      <AppointmentDetails
        open={detailsOpen}
        appointment={selectedAppointment}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedAppointment(null);
        }}
      />

      {/* =========================
          SNACKBAR
      ========================= */}
      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={3000}
        onClose={() => setSnackbar("")}
      >
        <Alert
          severity={
            snackbar.toLowerCase().includes("unable") ||
            snackbar.toLowerCase().includes("already") ||
            snackbar.toLowerCase().includes("error")
              ? "error"
              : "success"
          }
        >
          {snackbar}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Appointments;
