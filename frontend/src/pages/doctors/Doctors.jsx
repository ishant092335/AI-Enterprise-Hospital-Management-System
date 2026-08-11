import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";

import {
  getDoctorsWithPagination,
  searchDoctors,
  deleteDoctor,
} from "../../services/doctorService";

import DoctorForm from "./DoctorForm";
import DoctorDetails from "./DoctorDetails";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  const [formOpen, setFormOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [totalElements, setTotalElements] = useState(0);

  // =========================
  // LOAD DOCTORS
  // =========================
  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError("");

      if (search.trim()) {
        const data = await searchDoctors(search.trim());

        setDoctors(data || []);
        setTotalElements((data || []).length);
      } else {
        const data = await getDoctorsWithPagination(
          page,
          rowsPerPage,
          sortBy,
          sortDir,
        );

        setDoctors(data.content || []);
        setTotalElements(data.totalElements || 0);
      }
    } catch (error) {
      console.error("Doctors API Error:", error);
      setError("Unable to load doctors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, [page, rowsPerPage, sortBy, sortDir]);

  // =========================
  // SEARCH
  // =========================
  const handleSearch = async () => {
    setPage(0);
    await loadDoctors();
  };

  // =========================
  // SORT
  // =========================
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this doctor?",
    );

    if (!confirmed) return;

    try {
      await deleteDoctor(id);
      await loadDoctors();
    } catch (error) {
      console.error("Delete Doctor Error:", error);
      setError("Unable to delete doctor.");
    }
  };

  // =========================
  // AFTER SAVE
  // =========================
  const handleFormSuccess = async () => {
    setFormOpen(false);
    setSelectedDoctor(null);
    await loadDoctors();
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Doctors
          </Typography>

          <Typography color="text.secondary">
            Manage hospital doctors
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedDoctor(null);
            setFormOpen(true);
          }}
        >
          Add Doctor
        </Button>
      </Box>

      {/* SEARCH */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="Search doctors"
            placeholder="Name, specialization, email, phone, ID or experience"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Paper>

      {/* LOADING */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 6,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* ERROR */}
      {!loading && error && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}

      {/* TABLE */}
      {!loading && !error && (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  onClick={() => handleSort("id")}
                  sx={{ cursor: "pointer" }}
                >
                  <strong>ID</strong>
                </TableCell>

                <TableCell
                  onClick={() => handleSort("name")}
                  sx={{ cursor: "pointer" }}
                >
                  <strong>Name</strong>
                </TableCell>

                <TableCell
                  onClick={() => handleSort("specialization")}
                  sx={{ cursor: "pointer" }}
                >
                  <strong>Specialization</strong>
                </TableCell>

                <TableCell>
                  <strong>Email</strong>
                </TableCell>

                <TableCell>
                  <strong>Phone</strong>
                </TableCell>

                <TableCell
                  onClick={() => handleSort("experience")}
                  sx={{ cursor: "pointer" }}
                >
                  <strong>Experience</strong>
                </TableCell>

                <TableCell>
                  <strong>Qualification</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <TableRow key={doctor.id} hover>
                    <TableCell>{doctor.id}</TableCell>

                    <TableCell>{doctor.name}</TableCell>

                    <TableCell>{doctor.specialization}</TableCell>

                    <TableCell>{doctor.email}</TableCell>

                    <TableCell>{doctor.phone}</TableCell>

                    <TableCell>{doctor.experience} years</TableCell>

                    <TableCell>{doctor.qualification}</TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="info"
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setDetailsOpen(true);
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton
                        color="primary"
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setFormOpen(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => handleDelete(doctor.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No doctors found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {!search.trim() && (
            <TablePagination
              component="div"
              count={totalElements}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          )}
        </TableContainer>
      )}

      {/* FORM */}
      <DoctorForm
        open={formOpen}
        doctor={selectedDoctor}
        onClose={() => {
          setFormOpen(false);
          setSelectedDoctor(null);
        }}
        onSuccess={handleFormSuccess}
      />

      {/* DETAILS */}
      <DoctorDetails
        open={detailsOpen}
        doctor={selectedDoctor}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedDoctor(null);
        }}
      />
    </Box>
  );
}

export default Doctors;
