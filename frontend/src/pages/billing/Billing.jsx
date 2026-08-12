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
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    getBills,
    getBillById,
    deleteBill,
} from "../../services/billingService.js";

import BillForm from "./BillForm";
import BillDetails from "./BillDetails";

function Bills() {
    const [bills, setBills] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [formOpen, setFormOpen] = useState(false);

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);

    const [snackbar, setSnackbar] = useState("");

    // =========================
    // LOAD BILLS
    // =========================
    const loadBills = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getBills();

            setBills(response?.data || []);
        } catch (error) {
            console.error("Bills API Error:", error);

            setError("Unable to load bills.");
            setBills([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBills();
    }, []);

    // =========================
    // SEARCH
    // =========================
    const filteredBills = bills.filter((bill) => {
        if (!search.trim()) return true;

        const keyword = search.toLowerCase().trim();

        const invoiceNumber = bill.invoiceNumber?.toLowerCase() || "";
        const paymentStatus = bill.paymentStatus?.toLowerCase() || "";
        const paymentMethod = bill.paymentMethod?.toLowerCase() || "";

        const patientName =
            `${bill.appointment?.patient?.firstName || ""} ${
                bill.appointment?.patient?.lastName || ""
            }`.toLowerCase();

        const doctorName = bill.appointment?.doctor?.name?.toLowerCase() || "";

        return (
            invoiceNumber.includes(keyword) ||
            paymentStatus.includes(keyword) ||
            paymentMethod.includes(keyword) ||
            patientName.includes(keyword) ||
            doctorName.includes(keyword) ||
            String(bill.id).includes(keyword)
        );
    });

    // =========================
    // VIEW
    // =========================
    const handleView = async (bill) => {
        try {
            const response = await getBillById(bill.id);

            setSelectedBill(response?.data || null);
            setDetailsOpen(true);
        } catch (error) {
            console.error("Get Bill Error:", error);
            setSnackbar("Unable to load bill details.");
        }
    };

    // =========================
    // DELETE
    // =========================
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this bill?",
        );

        if (!confirmed) return;

        try {
            await deleteBill(id);

            setSnackbar("Bill deleted successfully");

            await loadBills();
        } catch (error) {
            console.error("Delete Bill Error:", error);

            setSnackbar("Unable to delete bill.");
        }
    };

    // =========================
    // AFTER BILL GENERATED
    // =========================
    const handleFormSuccess = async () => {
        setFormOpen(false);

        await loadBills();
    };

    const paginatedBills = filteredBills.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

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
                        Bills
                    </Typography>

                    <Typography color="text.secondary">
                        Manage hospital bills and payments
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={loadBills}
                    >
                        Refresh
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setFormOpen(true)}
                    >
                        Generate Bill
                    </Button>
                </Box>
            </Box>

            {/* SEARCH */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search by invoice, patient, doctor, payment status..."
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                        setPage(0);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
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
                                        <strong>Invoice</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Patient</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Doctor</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Bill Date</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Total</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Payment</strong>
                                    </TableCell>

                                    <TableCell>
                                        <strong>Status</strong>
                                    </TableCell>

                                    <TableCell align="center">
                                        <strong>Actions</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {paginatedBills.length > 0 ? (
                                    paginatedBills.map((bill) => {
                                        const patient = bill.appointment?.patient;
                                        const doctor = bill.appointment?.doctor;

                                        return (
                                            <TableRow key={bill.id} hover>
                                                <TableCell>{bill.id}</TableCell>

                                                <TableCell>
                                                    {bill.invoiceNumber || "-"}
                                                </TableCell>

                                                <TableCell>
                                                    <Typography fontWeight="600">
                                                        {patient?.firstName} {patient?.lastName}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>{doctor?.name || "-"}</TableCell>

                                                <TableCell>{bill.billDate || "-"}</TableCell>

                                                <TableCell>
                                                    ₹{Number(bill.totalAmount || 0).toFixed(2)}
                                                </TableCell>

                                                <TableCell>
                                                    {bill.paymentMethod || "-"}
                                                </TableCell>

                                                <TableCell>
                                                    {bill.paymentStatus || "-"}
                                                </TableCell>

                                                <TableCell align="center">
                                                    <IconButton
                                                        color="primary"
                                                        title="View"
                                                        onClick={() => handleView(bill)}
                                                    >
                                                        <VisibilityIcon />
                                                    </IconButton>

                                                    <IconButton
                                                        color="error"
                                                        title="Delete"
                                                        onClick={() => handleDelete(bill.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center">
                                            <Box sx={{ py: 5 }}>
                                                <Typography variant="h6">
                                                    No bills found
                                                </Typography>

                                                <Typography color="text.secondary">
                                                    Try another search or generate a new bill.
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={filteredBills.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                    />
                </Paper>
            )}

            {/* GENERATE BILL FORM */}
            <BillForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSuccess={handleFormSuccess}
            />

            {/* BILL DETAILS */}
            <BillDetails
                open={detailsOpen}
                bill={selectedBill}
                onClose={() => {
                    setDetailsOpen(false);
                    setSelectedBill(null);
                }}
            />

            {/* SNACKBAR */}
            <Snackbar
                open={Boolean(snackbar)}
                autoHideDuration={3000}
                onClose={() => setSnackbar("")}
            >
                <Alert
                    severity={
                        snackbar.toLowerCase().includes("unable")
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

export default Bills;