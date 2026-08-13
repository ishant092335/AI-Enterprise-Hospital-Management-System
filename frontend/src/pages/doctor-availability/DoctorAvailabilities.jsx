import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    getAllAvailability,
    getAvailabilityByDoctor,
    getAvailabilityByDoctorAndDay,
    deleteAvailability,
} from "../../services/doctorAvailabilityService";

import { getDoctorsWithPagination } from "../../services/doctorService";

import DoctorAvailabilityForm from "./DoctorAvailabilityForm";
import DoctorAvailabilityDetails from "./DoctorAvailabilityDetails";

function DoctorAvailabilities() {
    const [availability, setAvailability] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedDay, setSelectedDay] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [formOpen, setFormOpen] = useState(false);

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedAvailability, setSelectedAvailability] =
        useState(null);

    const days = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
    ];

    // =========================
    // LOAD DOCTORS
    // =========================
    const loadDoctors = async () => {
        try {
            const data = await getDoctorsWithPagination(
                0,
                100,
                "id",
                "asc"
            );

            setDoctors(data?.content || []);
        } catch (error) {
            console.error("Load Doctors Error:", error);
        }
    };

    // =========================
    // LOAD AVAILABILITY
    // =========================
    const loadAvailability = async () => {
        try {
            setLoading(true);
            setError("");

            let data;

            if (selectedDoctor && selectedDay) {
                data = await getAvailabilityByDoctorAndDay(
                    selectedDoctor,
                    selectedDay
                );
            } else if (selectedDoctor) {
                data = await getAvailabilityByDoctor(
                    selectedDoctor
                );
            } else {
                data = await getAllAvailability();
            }

            setAvailability(data || []);
        } catch (error) {
            console.error(
                "Load Availability Error:",
                error
            );

            setError(
                error?.response?.data?.message ||
                "Unable to load doctor availability."
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // INITIAL LOAD
    // =========================
    useEffect(() => {
        loadDoctors();
    }, []);

    // =========================
    // FILTER CHANGE
    // =========================
    useEffect(() => {
        loadAvailability();
    }, [selectedDoctor, selectedDay]);

    // =========================
    // DELETE
    // =========================
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this availability?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await deleteAvailability(id);

            await loadAvailability();
        } catch (error) {
            console.error(
                "Delete Availability Error:",
                error
            );

            setError(
                error?.response?.data?.message ||
                "Unable to delete availability."
            );
        }
    };

    // =========================
    // VIEW DETAILS
    // =========================
    const handleView = (item) => {
        setSelectedAvailability(item);
        setDetailsOpen(true);
    };

    // =========================
    // FORM SUCCESS
    // =========================
    const handleFormSuccess = async () => {
        setFormOpen(false);

        await loadAvailability();
    };

    // =========================
    // CLEAR FILTERS
    // =========================
    const clearFilters = () => {
        setSelectedDoctor("");
        setSelectedDay("");
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
                }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        Doctor Availability
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Manage doctor working days and time
                        slots
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setFormOpen(true)}
                >
                    Add Availability
                </Button>
            </Box>

            {/* =========================
                ERROR
            ========================= */}
            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                    onClose={() => setError("")}
                >
                    {error}
                </Alert>
            )}

            {/* =========================
                FILTER CARD
            ========================= */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ mb: 2 }}
                    >
                        Filter Availability
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                            alignItems: "center",
                        }}
                    >
                        {/* DOCTOR FILTER */}
                        <FormControl
                            sx={{
                                minWidth: 250,
                            }}
                        >
                            <InputLabel>
                                Doctor
                            </InputLabel>

                            <Select
                                value={selectedDoctor}
                                label="Doctor"
                                onChange={(event) =>
                                    setSelectedDoctor(
                                        event.target.value
                                    )
                                }
                            >
                                <MenuItem value="">
                                    All Doctors
                                </MenuItem>

                                {doctors.map((doctor) => (
                                    <MenuItem
                                        key={doctor.id}
                                        value={doctor.id}
                                    >
                                        {doctor.name} —{" "}
                                        {doctor.specialization}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* DAY FILTER */}
                        <FormControl
                            sx={{
                                minWidth: 180,
                            }}
                        >
                            <InputLabel>
                                Day
                            </InputLabel>

                            <Select
                                value={selectedDay}
                                label="Day"
                                onChange={(event) =>
                                    setSelectedDay(
                                        event.target.value
                                    )
                                }
                            >
                                <MenuItem value="">
                                    All Days
                                </MenuItem>

                                {days.map((day) => (
                                    <MenuItem
                                        key={day}
                                        value={day}
                                    >
                                        {day}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* CLEAR */}
                        <Button
                            variant="outlined"
                            onClick={clearFilters}
                            sx={{
                                height: 56,
                            }}
                        >
                            Clear Filters
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* =========================
                AVAILABILITY TABLE
            ========================= */}
            <Card>
                <CardContent>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ mb: 2 }}
                    >
                        Availability List
                    </Typography>

                    {loading ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                py: 5,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : availability.length === 0 ? (
                        <Alert severity="info">
                            No doctor availability found.
                        </Alert>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <strong>ID</strong>
                                        </TableCell>

                                        <TableCell>
                                            <strong>
                                                Doctor
                                            </strong>
                                        </TableCell>

                                        <TableCell>
                                            <strong>
                                                Day
                                            </strong>
                                        </TableCell>

                                        <TableCell>
                                            <strong>
                                                Start Time
                                            </strong>
                                        </TableCell>

                                        <TableCell>
                                            <strong>
                                                End Time
                                            </strong>
                                        </TableCell>

                                        <TableCell>
                                            <strong>
                                                Slot Duration
                                            </strong>
                                        </TableCell>

                                        <TableCell align="center">
                                            <strong>
                                                Actions
                                            </strong>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {availability.map(
                                        (item) => (
                                            <TableRow
                                                key={item.id}
                                                hover
                                            >
                                                <TableCell>
                                                    {item.id}
                                                </TableCell>

                                                <TableCell>
                                                    {item.doctor
                                                            ?.name ||
                                                        "N/A"}
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        item.dayOfWeek
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        item.startTime
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        item.endTime
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        item.slotDuration
                                                    }{" "}
                                                    min
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        startIcon={
                                                            <VisibilityIcon />
                                                        }
                                                        onClick={() =>
                                                            handleView(
                                                                item
                                                            )
                                                        }
                                                        sx={{
                                                            mr: 1,
                                                        }}
                                                    >
                                                        View
                                                    </Button>

                                                    <Button
                                                        size="small"
                                                        color="error"
                                                        variant="outlined"
                                                        startIcon={
                                                            <DeleteIcon />
                                                        }
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>

            {/* =========================
                ADD AVAILABILITY DIALOG
            ========================= */}
            <DoctorAvailabilityForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSuccess={handleFormSuccess}
            />

            {/* =========================
                DETAILS DIALOG
            ========================= */}
            <DoctorAvailabilityDetails
                open={detailsOpen}
                onClose={() => {
                    setDetailsOpen(false);
                    setSelectedAvailability(null);
                }}
                availability={selectedAvailability}
            />
        </Box>
    );
}

export default DoctorAvailabilities;