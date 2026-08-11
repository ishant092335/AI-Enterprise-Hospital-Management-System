import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { addDoctor, updateDoctor } from "../../services/doctorService";

function DoctorForm({ open, doctor, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
    experience: "",
    qualification: "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (doctor) {
      setForm({
        name: doctor.name || "",
        specialization: doctor.specialization || "",
        email: doctor.email || "",
        phone: doctor.phone || "",
        experience: doctor.experience ?? "",
        qualification: doctor.qualification || "",
      });
    } else {
      setForm({
        name: "",
        specialization: "",
        email: "",
        phone: "",
        experience: "",
        qualification: "",
      });
    }

    setErrors({});
  }, [doctor, open]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Doctor name is required";
    }

    if (!form.specialization.trim()) {
      newErrors.specialization = "Specialization is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must contain 10 digits";
    }

    if (form.experience === "") {
      newErrors.experience = "Experience is required";
    } else if (Number(form.experience) < 0) {
      newErrors.experience = "Experience cannot be negative";
    }

    if (!form.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      setSaving(true);

      const payload = {
        name: form.name.trim(),
        specialization: form.specialization.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        experience: Number(form.experience),
        qualification: form.qualification.trim(),
      };

      if (doctor) {
        await updateDoctor(doctor.id, payload);
      } else {
        await addDoctor(payload);
      }

      await onSuccess();
    } catch (error) {
      console.error("Doctor Save Error:", error);

      const message =
        error?.response?.data?.message || "Unable to save doctor.";

      setErrors({
        submit: message,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{doctor ? "Edit Doctor" : "Add Doctor"}</DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Doctor Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Specialization"
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            error={Boolean(errors.specialization)}
            helperText={errors.specialization}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
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
            inputProps={{ maxLength: 10 }}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Experience (Years)"
            name="experience"
            type="number"
            value={form.experience}
            onChange={handleChange}
            inputProps={{ min: 0 }}
            error={Boolean(errors.experience)}
            helperText={errors.experience}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Qualification"
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            error={Boolean(errors.qualification)}
            helperText={errors.qualification}
          />

          {errors.submit && (
            <Box
              sx={{
                color: "error.main",
                mt: 2,
              }}
            >
              {errors.submit}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={saving}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? "Saving..." : doctor ? "Update Doctor" : "Add Doctor"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default DoctorForm;
