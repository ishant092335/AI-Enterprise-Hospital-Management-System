package com.hms.backend.controller;

import com.hms.backend.dto.PrescriptionDTO;
import com.hms.backend.entity.Prescription;
import com.hms.backend.service.PrescriptionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin("*")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    // =========================
    // ADD PRESCRIPTION
    // ADMIN + DOCTOR
    // =========================
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public Prescription addPrescription(
            @Valid @RequestBody PrescriptionDTO dto) {

        return prescriptionService.savePrescription(dto);
    }

    // =========================
    // GET ALL PRESCRIPTIONS
    // ADMIN + DOCTOR
    // =========================
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public List<Prescription> getAllPrescriptions() {

        return prescriptionService.getAllPrescriptions();
    }

    // =========================
    // GET PRESCRIPTION BY ID
    // ADMIN + DOCTOR + PATIENT
    // =========================
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public Prescription getPrescriptionById(
            @PathVariable Long id) {

        return prescriptionService.getPrescriptionById(id);
    }

    // =========================
    // GET BY APPOINTMENT
    // ADMIN + DOCTOR + PATIENT
    // =========================
    @GetMapping("/appointment/{appointmentId}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public Prescription getPrescriptionByAppointment(
            @PathVariable Long appointmentId) {

        return prescriptionService.getPrescriptionByAppointment(
                appointmentId
        );
    }

    // =========================
    // DELETE PRESCRIPTION
    // ADMIN ONLY
    // =========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deletePrescription(
            @PathVariable Long id) {

        prescriptionService.deletePrescription(id);

        return "Prescription Deleted Successfully";
    }
}