import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Divider,
    Typography,
    Box,
} from "@mui/material";

function PrescriptionDetails({
                                 open,
                                 onClose,
                                 prescription,
                             }) {
    if (!prescription) {
        return null;
    }

    const patient = prescription.appointment?.patient;
    const doctor = prescription.appointment?.doctor;
    const appointment = prescription.appointment;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                Prescription Details
            </DialogTitle>

            <DialogContent>
                {/* =========================
            PRESCRIPTION INFO
        ========================= */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Prescription #{prescription.id}
                    </Typography>

                    <Typography color="text.secondary">
                        Created:{" "}
                        {prescription.createdAt
                            ? new Date(
                                prescription.createdAt
                            ).toLocaleString()
                            : "-"}
                    </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* =========================
            PATIENT
        ========================= */}
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                >
                    Patient Information
                </Typography>

                <Typography>
                    Name: {patient?.firstName || "-"}{" "}
                    {patient?.lastName || ""}
                </Typography>

                <Typography>
                    Patient ID: {patient?.id || "-"}
                </Typography>

                <Typography>
                    Phone: {patient?.phone || "-"}
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* =========================
            DOCTOR
        ========================= */}
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                >
                    Doctor Information
                </Typography>

                <Typography>
                    Name: {doctor?.name || "-"}
                </Typography>

                <Typography>
                    Specialization:{" "}
                    {doctor?.specialization || "-"}
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* =========================
            APPOINTMENT
        ========================= */}
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                >
                    Appointment Information
                </Typography>

                <Typography>
                    Appointment ID: {appointment?.id || "-"}
                </Typography>

                <Typography>
                    Date: {appointment?.appointmentDate || "-"}
                </Typography>

                <Typography>
                    Time: {appointment?.appointmentTime || "-"}
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* =========================
            DIAGNOSIS
        ========================= */}
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                >
                    Diagnosis
                </Typography>

                <Typography sx={{ mb: 3 }}>
                    {prescription.diagnosis || "-"}
                </Typography>

                {/* =========================
            MEDICINES
        ========================= */}
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                >
                    Medicines
                </Typography>

                <Typography
                    sx={{
                        whiteSpace: "pre-wrap",
                        mb: 3,
                    }}
                >
                    {prescription.medicines || "-"}
                </Typography>

                {/* =========================
            NOTES
        ========================= */}
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                >
                    Notes
                </Typography>

                <Typography
                    sx={{
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {prescription.notes || "-"}
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PrescriptionDetails;