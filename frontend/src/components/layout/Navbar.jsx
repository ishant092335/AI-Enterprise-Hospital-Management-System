import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "calc(100% - 240px)",
        ml: "240px",
        backgroundColor: "#ffffff",
        color: "#000",
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          Hospital Management System
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography>Admin</Typography>

          <Avatar>A</Avatar>

          <IconButton color="error" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
