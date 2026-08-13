import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MedicationIcon from "@mui/icons-material/Medication";

const drawerWidth = 240;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: <DashboardIcon />,
    },
    {
      label: "Patients",
      path: "/patients",
      icon: <PeopleIcon />,
    },
    {
      label: "Doctors",
      path: "/doctors",
      icon: <LocalHospitalIcon />,
    },
    {
      label: "Appointments",
      path: "/appointments",
      icon: <EventNoteIcon />,
    },
    {
      label: "Billing",
      path: "/billing",
      icon: <ReceiptLongIcon />,
    },
    {
      label: "Medical Records",
      path: "/medical-records",
      icon: <MedicalInformationIcon />,
    },
    {
      label: "Doctor Availability",
      path: "/doctor-availability",
      icon: <AccessTimeIcon />,
    },
    {
      label: "Prescriptions",
      path: "/prescriptions",
      icon: <MedicationIcon />,
    },
  ];

  return (
      <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
      >
        <Toolbar />

        <Box sx={{ px: 2, py: 2 }}>
          <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
              }}
          >
            HMS
          </Typography>
        </Box>

        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item) => (
                <ListItemButton
                    key={item.path}
                    selected={
                      item.path === "/"
                          ? location.pathname === "/"
                          : location.pathname.startsWith(item.path)
                    }
                    onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>

                  <ListItemText primary={item.label} />
                </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
  );
}

export default Sidebar;