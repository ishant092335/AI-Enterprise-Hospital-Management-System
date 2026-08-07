import { Typography, Paper } from "@mui/material";
import Layout from "../../components/layout/Layout";

function Dashboard() {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Paper
        elevation={2}
        sx={{
          p: 3,
          mt: 2,
        }}
      >
        Welcome to Hospital Management System
      </Paper>
    </Layout>
  );
}

export default Dashboard;
