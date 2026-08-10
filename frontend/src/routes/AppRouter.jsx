import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Patients from "../pages/patients/Patients";

import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";

function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Patients */}
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
