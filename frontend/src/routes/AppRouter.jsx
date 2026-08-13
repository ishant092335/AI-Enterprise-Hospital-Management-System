import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Patients from "../pages/patients/Patients";
import Doctors from "../pages/doctors/Doctors";
import Billing from "../pages/billing/Billing";
import MedicalRecords from "../pages/medical-records/MedicalRecords";
import DoctorAvailabilities from "../pages/doctor-availability/DoctorAvailabilities";
import Prescriptions from "../pages/prescriptions/Prescriptions";

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
                        isAuthenticated ? (
                            <Navigate to="/" replace />
                        ) : (
                            <Login />
                        )
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
            BILLING
        ========================= */}
                <Route
                    path="/billing"
                    element={
                        <ProtectedRoute>
                            <Billing />
                        </ProtectedRoute>
                    }
                />

                {/* =========================
            MEDICAL RECORDS
        ========================= */}
                <Route
                    path="/medical-records"
                    element={
                        <ProtectedRoute>
                            <MedicalRecords />
                        </ProtectedRoute>
                    }
                />

                {/* =========================
            DOCTOR AVAILABILITY
        ========================= */}
                <Route
                    path="/doctor-availability"
                    element={
                        <ProtectedRoute>
                            <DoctorAvailabilities />
                        </ProtectedRoute>
                    }
                />

                {/* =========================
            PRESCRIPTIONS
        ========================= */}
                <Route
                    path="/prescriptions"
                    element={
                        <ProtectedRoute>
                            <Prescriptions />
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