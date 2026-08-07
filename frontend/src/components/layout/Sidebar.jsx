import { Box, List, ListItemButton, ListItemText } from "@mui/material";

function Sidebar() {
  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        bgcolor: "#1976d2",
        color: "white",
      }}
    >
      <List>
        <ListItemButton sx={{ color: "white" }}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton sx={{ color: "white" }}>
          <ListItemText primary="Patients" />
        </ListItemButton>

        <ListItemButton sx={{ color: "white" }}>
          <ListItemText primary="Doctors" />
        </ListItemButton>

        <ListItemButton sx={{ color: "white" }}>
          <ListItemText primary="Appointments" />
        </ListItemButton>

        <ListItemButton sx={{ color: "white" }}>
          <ListItemText primary="Billing" />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default Sidebar;
