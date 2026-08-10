import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";

import { addPatient, updatePatient } from "../../services/patientService";

const initialForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  email: "",
  phone: "",
  bloodGroup: "",
  address: "",
};

function PatientForm({ open, onClose, patient, onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState("");

  const isEdit = Boolean(patient);

  useEffect(() => {
    if (patient) {
      setForm({
        firstName: patient.firstName || "",
        lastName: patient.lastName || "",
        age: patient.age || "",
        gender: patient.gender || "",
        email: patient.email || "",
        phone: patient.phone || "",
        bloodGroup: patient.bloodGroup || "",
        address: patient.address || "",
      });
    } else {
      setForm(initialForm);
    }

    setErrors({});
  }, [patient, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";

    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.age || Number(form.age) < 1) newErrors.age = "Enter a valid age";

    if (!form.gender) newErrors.gender = "Gender is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must contain 10 digits";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        ...form,
        age: Number(form.age),
      };

      if (isEdit) {
        await updatePatient(patient.id, payload);
      } else {
        await addPatient(payload);
      }

      setSnackbar(
        isEdit ? "Patient updated successfully" : "Patient added successfully",
      );

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 500);
    } catch (error) {
      console.error("Patient Save Error:", error);

      setSnackbar(error?.response?.data?.message || "Unable to save patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={loading ? undefined : onClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{isEdit ? "Edit Patient" : "Add Patient"}</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Age"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            error={Boolean(errors.age)}
            helperText={errors.age}
          />

          <TextField
            select
            fullWidth
            margin="normal"
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            error={Boolean(errors.gender)}
            helperText={errors.gender}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />

          <TextField
            select
            fullWidth
            margin="normal"
            label="Blood Group"
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
          >
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
            <MenuItem value="AB+">AB+</MenuItem>
            <MenuItem value="AB-">AB-</MenuItem>
            <MenuItem value="O+">O+</MenuItem>
            <MenuItem value="O-">O-</MenuItem>
          </TextField>

          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="address"
            multiline
            rows={2}
            value={form.address}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update Patient" : "Add Patient"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={3000}
        onClose={() => setSnackbar("")}
      >
        <Alert
          severity={
            snackbar.toLowerCase().includes("unable") ? "error" : "success"
          }
        >
          {snackbar}
        </Alert>
      </Snackbar>
    </>
  );
}

export default PatientForm;
