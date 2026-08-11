import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

function DoctorDetails({ open, doctor, onClose }) {
  if (!doctor) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Doctor Details</DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" fontWeight="bold">
              {doctor.name}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography color="text.secondary">Doctor ID</Typography>

            <Typography>{doctor.id}</Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography color="text.secondary">Status</Typography>

            <Typography>{doctor.status}</Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography color="text.secondary">Specialization</Typography>

            <Typography>{doctor.specialization}</Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography color="text.secondary">Email</Typography>

            <Typography>{doctor.email}</Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography color="text.secondary">Phone</Typography>

            <Typography>{doctor.phone}</Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography color="text.secondary">Experience</Typography>

            <Typography>{doctor.experience} years</Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography color="text.secondary">Qualification</Typography>

            <Typography>{doctor.qualification}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default DoctorDetails;
