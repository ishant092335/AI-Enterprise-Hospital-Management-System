import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    Divider,
    Box,
} from "@mui/material";

function DoctorAvailabilityDetails({
                                       open,
                                       onClose,
                                       availability,
                                   }) {
    if (!availability) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Doctor Availability Details
            </DialogTitle>

            <DialogContent>
                <Box sx={{ py: 1 }}>
                    <Typography variant="body1">
                        <strong>Availability ID:</strong>{" "}
                        {availability.id}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1">
                        <strong>Doctor:</strong>{" "}
                        {availability.doctor?.name || "N/A"}
                    </Typography>

                    <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Specialization:</strong>{" "}
                        {availability.doctor?.specialization || "N/A"}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1">
                        <strong>Day:</strong>{" "}
                        {availability.dayOfWeek}
                    </Typography>

                    <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Start Time:</strong>{" "}
                        {availability.startTime}
                    </Typography>

                    <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>End Time:</strong>{" "}
                        {availability.endTime}
                    </Typography>

                    <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Slot Duration:</strong>{" "}
                        {availability.slotDuration} minutes
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DoctorAvailabilityDetails;