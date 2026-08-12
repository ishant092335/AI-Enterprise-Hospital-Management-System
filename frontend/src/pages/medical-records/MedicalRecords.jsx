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
    getMedicalRecords,
    getMedicalRecordById,
    deleteMedicalRecord,
} from "../../services/medicalRecordService";

import MedicalRecordForm from "./MedicalRecordForm";
import MedicalRecordDetails from "./MedicalRecordDetails";

function MedicalRecords() {
    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [formOpen, setFormOpen] = useState(false);

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const [snackbar, setSnackbar] = useState("");

    // =========================
    // LOAD MEDICAL RECORDS
    // =========================
    const loadMedicalRecords = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getMedicalRecords();

            setRecords(
                Array.isArray(response?.data)
                    ? response.data
                    : Array.isArray(response)
                        ? response
                        : []
            );
        } catch (error) {
            console.error(
                "Medical Records API Error:",
                error
            );

            setError("Unable to load medical records.");
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // INITIAL LOAD
    // =========================
    useEffect(() => {
        loadMedicalRecords();
    }, []);

    // =========================
    // VIEW RECORD
    // =========================
    const handleView = async (record) => {
        try {
            const response =
                await getMedicalRecordById(record.id);

            const data =
                response?.data || response;

            setSelectedRecord(data);
            setDetailsOpen(true);
        } catch (error) {
            console.error(
                "Medical Record Details Error:",
                error
            );

            const message =
                error?.response?.data?.message ||
                "Unable to load medical record details.";

            setSnackbar(message);
        }
    };

    // =========================
    // DELETE RECORD
    // =========================
    const handleDelete = async (record) => {
        const patientName =
            record.appointment?.patient
                ? `${record.appointment.patient.firstName || ""} ${
                    record.appointment.patient.lastName || ""
                }`.trim()
                : "this patient";

        const confirmed = window.confirm(
            `Are you sure you want to delete the medical record for ${patientName}?`
        );

        if (!confirmed) return;

        try {
            await deleteMedicalRecord(record.id);

            setSnackbar(
                "Medical record deleted successfully."
            );

            await loadMedicalRecords();
        } catch (error) {
            console.error(
                "Delete Medical Record Error:",
                error
            );

            const message =
                error?.response?.data?.message ||
                "Unable to delete medical record.";

            setSnackbar(message);
        }
    };

    // =========================
    // AFTER CREATE
    // =========================
    const handleFormSuccess = async () => {
        setFormOpen(false);

        setSnackbar(
            "Medical record created successfully."
        );

        await loadMedicalRecords();
    };

    // =========================
    // SEARCH
    // =========================
    const filteredRecords = records.filter(
        (record) => {
            const patient =
                `${record.appointment?.patient?.firstName || ""} ${
                    record.appointment?.patient?.lastName || ""
                }`.toLowerCase();

            const doctor =
                record.appointment?.doctor?.name?.toLowerCase() ||
                "";

            const symptoms =
                record.symptoms?.toLowerCase() || "";

            const diagnosis =
                record.diagnosis?.toLowerCase() || "";

            const appointmentId =
                String(
                    record.appointment?.id || ""
                );

            const recordId =
                String(record.id || "");

            const searchValue =
                search.toLowerCase().trim();

            return (
                patient.includes(searchValue) ||
                doctor.includes(searchValue) ||
                symptoms.includes(searchValue) ||
                diagnosis.includes(searchValue) ||
                appointmentId.includes(searchValue) ||
                recordId.includes(searchValue)
            );
        }
    );

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
                        Medical Records
                    </Typography>

                    <Typography color="text.secondary">
                        Manage patient medical records
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
                        onClick={loadMedicalRecords}
                        disabled={loading}
                    >
                        Refresh
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() =>
                            setFormOpen(true)
                        }
                    >
                        Add Medical Record
                    </Button>
                </Box>
            </Box>

            {/* =========================
          SEARCH
      ========================= */}
            <Paper
                elevation={2}
                sx={{ p: 2, mb: 3 }}
            >
                <TextField
                    fullWidth
                    label="Search Medical Records"
                    placeholder="Search by patient, doctor, symptoms, diagnosis, record ID or appointment ID"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />
            </Paper>

            {/* =========================
          ERROR
      ========================= */}
            {!loading && error && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                >
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
                                        <strong>Appointment</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Symptoms</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Diagnosis</strong>
                                    </TableCell>

                                    <TableCell align="center">
                                        <strong>Actions</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredRecords.length > 0 ? (
                                    filteredRecords.map(
                                        (record) => (
                                            <TableRow
                                                key={record.id}
                                                hover
                                            >
                                                <TableCell>
                                                    {record.id}
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        fontWeight="600"
                                                    >
                                                        {record.appointment?.patient
                                                            ?.firstName || "-"}{" "}
                                                        {record.appointment?.patient
                                                            ?.lastName || ""}
                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        Patient ID:{" "}
                                                        {record.appointment
                                                            ?.patient?.id || "-"}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        fontWeight="600"
                                                    >
                                                        {record.appointment
                                                            ?.doctor?.name || "-"}
                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {record.appointment
                                                                ?.doctor?.specialization ||
                                                            ""}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography>
                                                        #
                                                        {record.appointment
                                                            ?.id || "-"}
                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {record.appointment
                                                                ?.appointmentDate ||
                                                            "-"}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    {record.symptoms || "-"}
                                                </TableCell>

                                                <TableCell>
                                                    {record.diagnosis || "-"}
                                                </TableCell>

                                                <TableCell align="center">
                                                    <IconButton
                                                        color="primary"
                                                        title="View"
                                                        onClick={() =>
                                                            handleView(record)
                                                        }
                                                    >
                                                        <VisibilityIcon />
                                                    </IconButton>

                                                    <IconButton
                                                        color="error"
                                                        title="Delete"
                                                        onClick={() =>
                                                            handleDelete(record)
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
                                                    {search
                                                        ? "No matching medical records found"
                                                        : "No medical records found"}
                                                </Typography>

                                                <Typography color="text.secondary">
                                                    {search
                                                        ? "Try a different search."
                                                        : "Add a medical record to see it here."}
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
          ADD FORM
      ========================= */}
            <MedicalRecordForm
                open={formOpen}
                onClose={() =>
                    setFormOpen(false)
                }
                onSuccess={handleFormSuccess}
            />

            {/* =========================
          DETAILS
      ========================= */}
            <MedicalRecordDetails
                open={detailsOpen}
                record={selectedRecord}
                onClose={() => {
                    setDetailsOpen(false);
                    setSelectedRecord(null);
                }}
            />

            {/* =========================
          SNACKBAR
      ========================= */}
            <Snackbar
                open={Boolean(snackbar)}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar("")
                }
            >
                <Alert
                    severity={
                        snackbar
                            .toLowerCase()
                            .includes("unable") ||
                        snackbar
                            .toLowerCase()
                            .includes("already") ||
                        snackbar
                            .toLowerCase()
                            .includes("error")
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

export default MedicalRecords;