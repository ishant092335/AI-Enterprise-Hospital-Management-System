import { Box, Toolbar, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import StatCard from "../../components/dashboard/StatCard";

import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { getDashboardData } from "../../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalBills: 0,
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardData();
        setDashboard(data);
      } catch (error) {
        console.error("Dashboard API Error:", error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <Navbar />

        <Toolbar />

        <Box sx={{ p: 3 }}>
          <Typography variant="h4" fontWeight="bold" mb={3}>
            Dashboard
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <StatCard
                title="Patients"
                value={dashboard.totalPatients}
                icon={<PeopleIcon />}
                color="#1976d2"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <StatCard
                title="Doctors"
                value={dashboard.totalDoctors}
                icon={<LocalHospitalIcon />}
                color="#2e7d32"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <StatCard
                title="Appointments"
                value={dashboard.totalAppointments}
                icon={<EventNoteIcon />}
                color="#ed6c02"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <StatCard
                title="Bills"
                value={dashboard.totalBills || 0}
                icon={<ReceiptLongIcon />}
                color="#9c27b0"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
