import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
} from "@mui/material";

function MedicalRecordDetails({ open, record, onClose }) {
    if (!record) {
        return (
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle>Medical Record Details</DialogTitle>

                <DialogContent>
                    <Alert severity="info">No medical record selected.</Alert>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }

    const patient = record.appointment?.patient;
    const doctor = record.appointment?.doctor;
    const appointment = record.appointment;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                Medical Record #{record.id}
            </DialogTitle>

            <DialogContent>
                {/* PATIENT & DOCTOR */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr",
                        },
                        gap: 3,
                        mb: 3,
                    }}
                >
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Patient
                        </Typography>

                        <Typography variant="h6">
                            {patient?.firstName || "-"} {patient?.lastName || ""}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Patient ID: {patient?.id || "-"}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Doctor
                        </Typography>

                        <Typography variant="h6">
                            {doctor?.name || "-"}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {doctor?.specialization || "-"}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* APPOINTMENT */}
                <Typography variant="h6" gutterBottom>
                    Appointment Information
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr 1fr",
                        },
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Appointment ID
                        </Typography>
                        <Typography>
                            {appointment?.id || "-"}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Date
                        </Typography>
                        <Typography>
                            {appointment?.appointmentDate || "-"}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Time
                        </Typography>
                        <Typography>
                            {appointment?.appointmentTime || "-"}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* MEDICAL INFORMATION */}
                <Typography variant="h6" gutterBottom>
                    Medical Information
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Symptoms
                    </Typography>

                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                        {record.symptoms || "-"}
                    </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Diagnosis
                    </Typography>

                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                        {record.diagnosis || "-"}
                    </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Treatment
                    </Typography>

                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                        {record.treatment || "-"}
                    </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Remarks
                    </Typography>

                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                        {record.remarks || "-"}
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MedicalRecordDetails;