package com.hms.backend.controller;

import com.hms.backend.entity.Patient;
import com.hms.backend.payload.ApiResponse;
import com.hms.backend.service.PatientService;
import com.hms.backend.util.ApiResponseUtil;
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
    public ApiResponse<Patient> addPatient(@Valid @RequestBody Patient patient) {

        Patient savedPatient = patientService.savePatient(patient);

        return ApiResponseUtil.success(
                "Patient created successfully",
                savedPatient
        );
    }

    // =========================
    // GET ALL PATIENTS
    // =========================
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public ApiResponse<List<Patient>> getAllPatients() {

        return ApiResponseUtil.success(
                "Patients fetched successfully",
                patientService.getAllPatients()
        );
    }

    // =========================
    // GET PATIENT BY ID
    // =========================
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public ApiResponse<Patient> getPatientById(@PathVariable Long id) {

        return ApiResponseUtil.success(
                "Patient fetched successfully",
                patientService.getPatientById(id)
        );
    }

    // =========================
    // PAGINATION + SORTING
    // =========================
    @GetMapping("/pagination")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ApiResponse<Page<Patient>> getPatientsWithPagination(

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        return ApiResponseUtil.success(
                "Patients fetched successfully",
                patientService.getPatientsWithPagination(
                        page,
                        size,
                        sortBy,
                        sortDir
                )
        );
    }

    // =========================
    // ENTERPRISE SEARCH
    // =========================
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ApiResponse<List<Patient>> searchPatients(
            @RequestParam("keyword") String keyword) {

        return ApiResponseUtil.success(
                "Search completed successfully",
                patientService.searchPatients(keyword)
        );
    }

    // =========================
    // SORT BY FIRST NAME
    // =========================
    @GetMapping("/sort")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ApiResponse<List<Patient>> getPatientsSortedByFirstName() {

        return ApiResponseUtil.success(
                "Patients sorted successfully",
                patientService.getPatientsSortedByFirstName()
        );
    }

    // =========================
    // UPDATE PATIENT
    // =========================
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Patient> updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody Patient patient) {

        return ApiResponseUtil.success(
                "Patient updated successfully",
                patientService.updatePatient(id, patient)
        );
    }

    // =========================
    // DELETE PATIENT
    // =========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> deletePatient(@PathVariable Long id) {

        patientService.deletePatient(id);

        return ApiResponseUtil.success(
                "Patient deleted successfully"
        );
    }
}