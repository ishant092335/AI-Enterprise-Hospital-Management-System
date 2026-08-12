import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Typography,
} from "@mui/material";

function BillDetails({ open, bill, onClose }) {
    const appointment = bill?.appointment;
    const patient = appointment?.patient;
    const doctor = appointment?.doctor;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                Bill Details
            </DialogTitle>

            <DialogContent dividers>
                {!bill ? (
                    <Alert severity="info">
                        Bill details are not available.
                    </Alert>
                ) : (
                    <Box>
                        {/* =========================
                INVOICE HEADER
            ========================= */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                                gap: 2,
                                flexWrap: "wrap",
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    Invoice: {bill.invoiceNumber || "N/A"}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Bill Date: {bill.billDate || "N/A"}
                                </Typography>
                            </Box>

                            <Typography
                                fontWeight="bold"
                                sx={{
                                    color:
                                        bill.paymentStatus === "PAID"
                                            ? "success.main"
                                            : "warning.main",
                                }}
                            >
                                {bill.paymentStatus || "N/A"}
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        {/* =========================
                PATIENT + DOCTOR
            ========================= */}
                        <Grid container spacing={3}>
                            {/* PATIENT */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    sx={{ mb: 1 }}
                                >
                                    Patient Information
                                </Typography>

                                <Typography>
                                    <strong>Name:</strong>{" "}
                                    {patient?.firstName || "-"}{" "}
                                    {patient?.lastName || ""}
                                </Typography>

                                <Typography>
                                    <strong>Patient ID:</strong>{" "}
                                    {patient?.id || "-"}
                                </Typography>

                                <Typography>
                                    <strong>Age:</strong>{" "}
                                    {patient?.age ?? "-"}
                                </Typography>

                                <Typography>
                                    <strong>Gender:</strong>{" "}
                                    {patient?.gender || "-"}
                                </Typography>

                                <Typography>
                                    <strong>Email:</strong>{" "}
                                    {patient?.email || "-"}
                                </Typography>

                                <Typography>
                                    <strong>Phone:</strong>{" "}
                                    {patient?.phone || "-"}
                                </Typography>

                                <Typography>
                                    <strong>Blood Group:</strong>{" "}
                                    {patient?.bloodGroup || "-"}
                                </Typography>
                            </Grid>

                            {/* DOCTOR */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    sx={{ mb: 1 }}
                                >
                                    Doctor Information
                                </Typography>

                                <Typography>
                                    <strong>Name:</strong>{" "}
                                    {doctor?.name || "-"}
                                </Typography>

                                <Typography>
                                    <strong>Doctor ID:</strong>{" "}
                                    {doctor?.id || "-"}
                                </Typography>

                                <Typography>
                                    <strong>Specialization:</strong>{" "}
                                    {doctor?.specialization || "-"}
                                </Typography>

                                <Typography>
                                    <strong>Email:</strong>{" "}
                                    {doctor?.email || "-"}
                                </Typography>

                                <Typography>
                                    <strong>Phone:</strong>{" "}
                                    {doctor?.phone || "-"}
                                </Typography>

                                <Typography>
                                    <strong>Experience:</strong>{" "}
                                    {doctor?.experience ?? "-"} years
                                </Typography>

                                <Typography>
                                    <strong>Qualification:</strong>{" "}
                                    {doctor?.qualification || "-"}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        {/* =========================
                APPOINTMENT
            ========================= */}
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{ mb: 1 }}
                        >
                            Appointment Information
                        </Typography>

                        <Typography>
                            <strong>Appointment ID:</strong>{" "}
                            {appointment?.id || "-"}
                        </Typography>

                        <Typography>
                            <strong>Date:</strong>{" "}
                            {appointment?.appointmentDate || "-"}
                        </Typography>

                        <Typography>
                            <strong>Time:</strong>{" "}
                            {appointment?.appointmentTime || "-"}
                        </Typography>

                        <Typography>
                            <strong>Status:</strong>{" "}
                            {appointment?.status || "-"}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        {/* =========================
                BILL CHARGES
            ========================= */}
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{ mb: 2 }}
                        >
                            Bill Charges
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1.2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography>
                                    Consultation Fee
                                </Typography>

                                <Typography>
                                    ₹
                                    {Number(
                                        bill.consultationFee || 0
                                    ).toFixed(2)}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography>
                                    Medicine Fee
                                </Typography>

                                <Typography>
                                    ₹
                                    {Number(
                                        bill.medicineFee || 0
                                    ).toFixed(2)}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography>
                                    Lab Fee
                                </Typography>

                                <Typography>
                                    ₹
                                    {Number(
                                        bill.labFee || 0
                                    ).toFixed(2)}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography>
                                    Other Charges
                                </Typography>

                                <Typography>
                                    ₹
                                    {Number(
                                        bill.otherCharges || 0
                                    ).toFixed(2)}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography>
                                    Tax
                                </Typography>

                                <Typography>
                                    ₹
                                    {Number(
                                        bill.tax || 0
                                    ).toFixed(2)}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography>
                                    Discount
                                </Typography>

                                <Typography>
                                    - ₹
                                    {Number(
                                        bill.discount || 0
                                    ).toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* =========================
                TOTAL
            ========================= */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                            >
                                Total Amount
                            </Typography>

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                color="primary"
                            >
                                ₹
                                {Number(
                                    bill.totalAmount || 0
                                ).toFixed(2)}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* =========================
                PAYMENT
            ========================= */}
                        <Typography>
                            <strong>Payment Method:</strong>{" "}
                            {bill.paymentMethod || "-"}
                        </Typography>

                        <Typography>
                            <strong>Payment Status:</strong>{" "}
                            {bill.paymentStatus || "-"}
                        </Typography>
                    </Box>
                )}
            </DialogContent>

            <DialogActions>
                <Button
                    variant="contained"
                    onClick={onClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default BillDetails;