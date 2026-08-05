package com.hms.backend.controller;

import com.hms.backend.entity.Patient;
import com.hms.backend.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin("*")
public class PatientController {

    @Autowired
    private PatientService patientService;

    // =========================
    // CREATE PATIENT
    // =========================
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Patient addPatient(@Valid @RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }

    // =========================
    // GET ALL PATIENTS
    // =========================
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // =========================
    // GET PATIENT BY ID
    // =========================
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public Patient getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    // =========================
    // PAGINATION + SORTING
    // =========================
    @GetMapping("/pagination")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public Page<Patient> getPatientsWithPagination(

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        return patientService.getPatientsWithPagination(
                page,
                size,
                sortBy,
                sortDir
        );
    }

    // =========================
    // ENTERPRISE SEARCH
    // =========================
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public List<Patient> searchPatients(
            @RequestParam("keyword") String keyword) {

        return patientService.searchPatients(keyword);
    }

    // =========================
    // SORT BY FIRST NAME
    // =========================
    @GetMapping("/sort")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public List<Patient> getPatientsSortedByFirstName() {
        return patientService.getPatientsSortedByFirstName();
    }

    // =========================
    // UPDATE PATIENT
    // =========================
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Patient updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody Patient patient) {

        return patientService.updatePatient(id, patient);
    }

    // =========================
    // DELETE PATIENT
    // =========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deletePatient(@PathVariable Long id) {

        patientService.deletePatient(id);

        return "Patient Deleted Successfully";
    }
}