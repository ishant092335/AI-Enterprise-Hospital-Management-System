import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  getPatientsWithPagination,
  searchPatients,
  deletePatient,
  getPatientById,
} from "../../services/patientService";

import PatientForm from "./PatientForm";
import PatientDetails from "./PatientDetails";

function Patients() {
  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  const [totalPatients, setTotalPatients] = useState(0);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsPatient, setDetailsPatient] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  const [snackbar, setSnackbar] = useState("");

  // =========================
  // LOAD PATIENTS
  // =========================
  const loadPatients = async () => {
    try {
      setLoading(true);
      setError("");

      if (search.trim()) {
        const data = await searchPatients(search.trim());

        setPatients(data || []);
        setTotalPatients(data?.length || 0);
      } else {
        const data = await getPatientsWithPagination(
          page,
          rowsPerPage,
          sortBy,
          sortDir,
        );

        setPatients(data?.content || []);
        setTotalPatients(data?.totalElements || 0);
      }
    } catch (error) {
      console.error("Patients API Error:", error);

      setError("Unable to load patients.");
      setPatients([]);
      setTotalPatients(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadPatients();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, page, rowsPerPage, sortBy, sortDir]);

  // =========================
  // ADD
  // =========================
  const handleAdd = () => {
    setSelectedPatient(null);
    setFormOpen(true);
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = async (patient) => {
    try {
      const data = await getPatientById(patient.id);

      setSelectedPatient(data);
      setFormOpen(true);
    } catch (error) {
      setSnackbar("Unable to load patient details.");
    }
  };

  // =========================
  // VIEW
  // =========================
  const handleView = async (patient) => {
    try {
      const data = await getPatientById(patient.id);

      setDetailsPatient(data);
      setDetailsOpen(true);
    } catch (error) {
      setSnackbar("Unable to load patient details.");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async () => {
    if (!patientToDelete) return;

    try {
      await deletePatient(patientToDelete.id);

      setDeleteOpen(false);
      setPatientToDelete(null);

      setSnackbar("Patient deleted successfully");

      await loadPatients();
    } catch (error) {
      console.error("Delete Patient Error:", error);
      setSnackbar("Unable to delete patient.");
    }
  };

  // =========================
  // SORT
  // =========================
  const handleSortChange = (event) => {
    const value = event.target.value;

    if (value === sortBy) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(value);
      setSortDir("asc");
    }

    setPage(0);
  };

  return (
    <Box>
      {/* HEADER */}
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
          <Typography variant="h4" fontWeight="bold">
            Patients
          </Typography>

          <Typography color="text.secondary">
            Manage hospital patients
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadPatients}
          >
            Refresh
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add Patient
          </Button>
        </Box>
      </Box>

      {/* SEARCH + SORT */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            sx={{ flex: 1, minWidth: 280 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {!search.trim() && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Select size="small" value={sortBy} onChange={handleSortChange}>
                <MenuItem value="id">ID</MenuItem>
                <MenuItem value="firstName">First Name</MenuItem>
                <MenuItem value="age">Age</MenuItem>
                <MenuItem value="email">Email</MenuItem>
              </Select>

              <Button
                variant="outlined"
                onClick={() =>
                  setSortDir((prev) => (prev === "asc" ? "desc" : "asc"))
                }
              >
                {sortDir === "asc" ? "↑ ASC" : "↓ DESC"}
              </Button>
            </Box>
          )}
        </Box>
      </Paper>

      {/* ERROR */}
      {!loading && error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* LOADING */}
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

      {/* TABLE */}
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
                    <strong>Age</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Gender</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Phone</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Blood Group</strong>
                  </TableCell>

                  <TableCell align="center">
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {patients.length > 0 ? (
                  patients.map((patient) => (
                    <TableRow key={patient.id} hover>
                      <TableCell>{patient.id}</TableCell>

                      <TableCell>
                        <Typography fontWeight="600">
                          {patient.firstName} {patient.lastName}
                        </Typography>
                      </TableCell>

                      <TableCell>{patient.age}</TableCell>

                      <TableCell>{patient.gender}</TableCell>

                      <TableCell>{patient.email}</TableCell>

                      <TableCell>{patient.phone}</TableCell>

                      <TableCell>{patient.bloodGroup || "-"}</TableCell>

                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          title="View"
                          onClick={() => handleView(patient)}
                        >
                          <VisibilityIcon />
                        </IconButton>

                        <IconButton
                          color="warning"
                          title="Edit"
                          onClick={() => handleEdit(patient)}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          color="error"
                          title="Delete"
                          onClick={() => {
                            setPatientToDelete(patient);
                            setDeleteOpen(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Box sx={{ py: 5 }}>
                        <Typography variant="h6">No patients found</Typography>

                        <Typography color="text.secondary">
                          Try another search.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {!search.trim() && (
            <TablePagination
              component="div"
              count={totalPatients}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 20, 50]}
            />
          )}
        </Paper>
      )}

      {/* ADD / EDIT */}
      <PatientForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        patient={selectedPatient}
        onSuccess={loadPatients}
      />

      {/* DETAILS */}
      <PatientDetails
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        patient={detailsPatient}
      />

      {/* DELETE CONFIRMATION */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete Patient?</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>
              {patientToDelete?.firstName} {patientToDelete?.lastName}
            </strong>
            ?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>

          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={3000}
        onClose={() => setSnackbar("")}
      >
        <Alert
          severity={
            snackbar.toLowerCase().includes("unable") ? "error" : "success"
          }
        >
          {snackbar}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Patients;
