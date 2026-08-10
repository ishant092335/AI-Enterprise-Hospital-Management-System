import {
  Avatar,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";

function PatientDetails({ open, onClose, patient }) {
  if (!patient) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Patient Profile
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Avatar sx={{ width: 64, height: 64 }}>
            <PersonIcon />
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight="bold">
              {patient.firstName} {patient.lastName}
            </Typography>

            <Typography color="text.secondary">
              Patient ID: #{patient.id}
            </Typography>
          </Box>

          <Chip
            label="ACTIVE"
            color="success"
            size="small"
            sx={{ ml: "auto" }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" fontWeight="bold" mb={2}>
          Personal Information
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary">First Name</Typography>
            <Typography fontWeight="600">{patient.firstName}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary">Last Name</Typography>
            <Typography fontWeight="600">{patient.lastName}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary">Age</Typography>
            <Typography fontWeight="600">{patient.age}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary">Gender</Typography>
            <Typography fontWeight="600">{patient.gender}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary">Blood Group</Typography>
            <Typography fontWeight="600">
              {patient.bloodGroup || "Not specified"}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" mb={2}>
          Contact Information
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary">Email</Typography>
            <Typography fontWeight="600">{patient.email}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary">Phone</Typography>
            <Typography fontWeight="600">{patient.phone}</Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography color="text.secondary">Address</Typography>
            <Typography fontWeight="600">
              {patient.address || "Not specified"}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default PatientDetails;
