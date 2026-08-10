import { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", form);

      console.log("Login Response:", response.data);

      login(response.data.token);

      navigate("/");
    } catch (error) {
      console.log(error.response);
      console.log(error.response?.data);
      alert("Invalid Username or Password");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f7fb",
      }}
    >
      <Paper sx={{ p: 4, width: 380 }}>
        <Typography variant="h4" mb={3} textAlign="center">
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            margin="normal"
            value={form.username}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
          />

          <Button fullWidth variant="contained" sx={{ mt: 3 }} type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
