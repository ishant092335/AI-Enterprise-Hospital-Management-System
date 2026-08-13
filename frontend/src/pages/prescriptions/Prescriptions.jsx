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
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    getPrescriptions,
    deletePrescription,
} from "../../services/prescriptionService";

import PrescriptionForm from "./PrescriptionForm";
import PrescriptionDetails from "./PrescriptionDetails";

function Prescriptions() {
    const [prescriptions, setPrescriptions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [snackbar, setSnackbar] = useState("");

    const [formOpen, setFormOpen] = useState(false);

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedPrescription, setSelectedPrescription] =
        useState(null);

    // =========================
    // LOAD PRESCRIPTIONS
    // =========================
    const loadPrescriptions = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getPrescriptions();

            setPrescriptions(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(
                "Prescription API Error:",
                error
            );

            setError("Unable to load prescriptions.");
            setPrescriptions([]);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // INITIAL LOAD
    // =========================
    useEffect(() => {
        loadPrescriptions();
    }, []);

    // =========================
    // DELETE
    // =========================
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this prescription?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deletePrescription(id);

            setSnackbar(
                "Prescription deleted successfully."
            );

            await loadPrescriptions();
        } catch (error) {
            console.error(
                "Delete Prescription Error:",
                error
            );

            setSnackbar(
                error?.response?.data?.message ||
                "Unable to delete prescription."
            );
        }
    };

    // =========================
    // VIEW
    // =========================
    const handleView = (prescription) => {
        setSelectedPrescription(prescription);
        setDetailsOpen(true);
    };

    // =========================
    // SEARCH
    // =========================
    const filteredPrescriptions =
        prescriptions.filter((prescription) => {
            const patientName = `${
                prescription.appointment?.patient?.firstName || ""
            } ${
                prescription.appointment?.patient?.lastName || ""
            }`;

            const doctorName =
                prescription.appointment?.doctor?.name || "";

            const diagnosis =
                prescription.diagnosis || "";

            const medicines =
                prescription.medicines || "";

            const appointmentId =
                String(
                    prescription.appointment?.id || ""
                );

            const searchText =
                search.toLowerCase();

            return (
                patientName
                    .toLowerCase()
                    .includes(searchText) ||
                doctorName
                    .toLowerCase()
                    .includes(searchText) ||
                diagnosis
                    .toLowerCase()
                    .includes(searchText) ||
                medicines
                    .toLowerCase()
                    .includes(searchText) ||
                appointmentId.includes(searchText)
            );
        });

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
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        Prescriptions
                    </Typography>

                    <Typography color="text.secondary">
                        Manage patient prescriptions
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={loadPrescriptions}
                        disabled={loading}
                    >
                        Refresh
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setFormOpen(true)}
                    >
                        Add Prescription
                    </Button>
                </Box>
            </Box>

            {/* =========================
          SEARCH
      ========================= */}
            <TextField
                fullWidth
                label="Search prescriptions"
                placeholder="Search by patient, doctor, diagnosis, medicine or appointment ID"
                value={search}
                onChange={(event) =>
                    setSearch(event.target.value)
                }
                sx={{ mb: 3 }}
            />

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
                                        <strong>Appointment</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Patient</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Doctor</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Diagnosis</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Medicines</strong>
                                    </TableCell>

                                    <TableCell align="center">
                                        <strong>Actions</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredPrescriptions.length > 0 ? (
                                    filteredPrescriptions.map(
                                        (prescription) => (
                                            <TableRow
                                                key={prescription.id}
                                                hover
                                            >
                                                <TableCell>
                                                    {prescription.id}
                                                </TableCell>

                                                <TableCell>
                                                    #
                                                    {prescription
                                                        .appointment?.id || "-"}
                                                </TableCell>

                                                <TableCell>
                                                    <Typography fontWeight="600">
                                                        {prescription
                                                            .appointment?.patient
                                                            ?.firstName || ""}{" "}
                                                        {prescription
                                                            .appointment?.patient
                                                            ?.lastName || ""}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    {prescription
                                                        .appointment?.doctor
                                                        ?.name || "-"}
                                                </TableCell>

                                                <TableCell>
                                                    {prescription.diagnosis ||
                                                        "-"}
                                                </TableCell>

                                                <TableCell
                                                    sx={{
                                                        maxWidth: 250,
                                                    }}
                                                >
                                                    {prescription.medicines ||
                                                        "-"}
                                                </TableCell>

                                                <TableCell align="center">
                                                    <IconButton
                                                        color="primary"
                                                        title="View"
                                                        onClick={() =>
                                                            handleView(
                                                                prescription
                                                            )
                                                        }
                                                    >
                                                        <VisibilityIcon />
                                                    </IconButton>

                                                    <IconButton
                                                        color="error"
                                                        title="Delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                prescription.id
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            align="center"
                                        >
                                            <Box sx={{ py: 5 }}>
                                                <Typography variant="h6">
                                                    No prescriptions found
                                                </Typography>

                                                <Typography color="text.secondary">
                                                    {search
                                                        ? "No prescriptions match your search."
                                                        : "There are no prescriptions available."}
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
          FORM
      ========================= */}
            <PrescriptionForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSuccess={async () => {
                    setFormOpen(false);
                    setSnackbar(
                        "Prescription added successfully."
                    );
                    await loadPrescriptions();
                }}
            />

            {/* =========================
          DETAILS
      ========================= */}
            <PrescriptionDetails
                open={detailsOpen}
                onClose={() => {
                    setDetailsOpen(false);
                    setSelectedPrescription(null);
                }}
                prescription={selectedPrescription}
            />

            {/* =========================
          SNACKBAR
      ========================= */}
            <Snackbar
                open={Boolean(snackbar)}
                autoHideDuration={3000}
                onClose={() => setSnackbar("")}
                message={snackbar}
            />
        </Box>
    );
}

export default Prescriptions;