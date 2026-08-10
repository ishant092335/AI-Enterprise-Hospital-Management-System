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
      label: "Bills",
      path: "/bills",
      icon: <ReceiptLongIcon />,
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
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          HMS
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={location.pathname === item.path}
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
