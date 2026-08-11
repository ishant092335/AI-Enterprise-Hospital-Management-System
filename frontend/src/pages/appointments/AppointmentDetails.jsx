import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

function AppointmentDetails({ open, appointment, onClose }) {
  if (!appointment) {
    return null;
  }

  const patient = appointment.patient;
  const doctor = appointment.doctor;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Appointment Details</DialogTitle>

      <DialogContent>
        {/* APPOINTMENT */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Appointment Information
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography>
            <strong>Appointment ID:</strong> {appointment.id}
          </Typography>

          <Typography>
            <strong>Date:</strong> {appointment.appointmentDate}
          </Typography>

          <Typography>
            <strong>Time:</strong> {appointment.appointmentTime}
          </Typography>

          <Typography>
            <strong>Status:</strong> {appointment.status}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* PATIENT */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Patient Information
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography>
            <strong>Name:</strong> {patient?.firstName} {patient?.lastName}
          </Typography>

          <Typography>
            <strong>Patient ID:</strong> {patient?.id}
          </Typography>

          <Typography>
            <strong>Age:</strong> {patient?.age}
          </Typography>

          <Typography>
            <strong>Gender:</strong> {patient?.gender}
          </Typography>

          <Typography>
            <strong>Email:</strong> {patient?.email}
          </Typography>

          <Typography>
            <strong>Phone:</strong> {patient?.phone}
          </Typography>

          <Typography>
            <strong>Blood Group:</strong> {patient?.bloodGroup || "-"}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* DOCTOR */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Doctor Information
        </Typography>

        <Box>
          <Typography>
            <strong>Name:</strong> {doctor?.name}
          </Typography>

          <Typography>
            <strong>Doctor ID:</strong> {doctor?.id}
          </Typography>

          <Typography>
            <strong>Specialization:</strong> {doctor?.specialization}
          </Typography>

          <Typography>
            <strong>Email:</strong> {doctor?.email}
          </Typography>

          <Typography>
            <strong>Phone:</strong> {doctor?.phone}
          </Typography>

          <Typography>
            <strong>Experience:</strong> {doctor?.experience} years
          </Typography>

          <Typography>
            <strong>Qualification:</strong> {doctor?.qualification}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AppointmentDetails;
