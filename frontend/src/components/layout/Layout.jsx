import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box
          sx={{
            flex: 1,
            p: 3,
            bgcolor: "#f5f7fb",
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}

export default Layout;
