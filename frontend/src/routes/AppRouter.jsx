import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Patients from "../pages/patients/Patients";
import Doctors from "../pages/doctors/Doctors";
import Appointments from "../pages/appointments/Appointments";

import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";

function AppRouter() {
    const { isAuthenticated } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {/* =========================
            LOGIN
        ========================= */}
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? <Navigate to="/" replace /> : <Login />
                    }
                />

                {/* =========================
            DASHBOARD
        ========================= */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* =========================
            PATIENTS
        ========================= */}
                <Route
                    path="/patients"
                    element={
                        <ProtectedRoute>
                            <Patients />
                        </ProtectedRoute>
                    }
                />

                {/* =========================
            DOCTORS
        ========================= */}
                <Route
                    path="/doctors"
                    element={
                        <ProtectedRoute>
                            <Doctors />
                        </ProtectedRoute>
                    }
                />

                {/* =========================
            APPOINTMENTS
        ========================= */}
                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    }
                />

                {/* =========================
            UNKNOWN ROUTES
        ========================= */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to={isAuthenticated ? "/" : "/login"}
                            replace
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;