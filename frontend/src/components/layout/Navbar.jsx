import { AppBar, Toolbar, Typography } from "@mui/material";

function Navbar() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          Hospital Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
