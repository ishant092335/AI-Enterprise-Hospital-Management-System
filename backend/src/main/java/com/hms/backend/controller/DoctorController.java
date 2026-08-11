package com.hms.backend.controller;

import com.hms.backend.entity.Doctor;
import com.hms.backend.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin("*")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // =========================
    // CREATE DOCTOR
    // =========================
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Doctor addDoctor(
            @Valid @RequestBody Doctor doctor) {

        return doctorService.saveDoctor(doctor);
    }

    // =========================
    // GET ALL ACTIVE DOCTORS
    // =========================
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public List<Doctor> getAllDoctors() {

        return doctorService.getAllDoctors();
    }

    // =========================
    // GET DOCTOR BY ID
    // =========================
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public Doctor getDoctorById(
            @PathVariable Long id) {

        return doctorService.getDoctorById(id);
    }

    // =========================
    // PAGINATION + SORTING
    // =========================
    @GetMapping("/pagination")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public Page<Doctor> getDoctorsWithPagination(

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        return doctorService.getDoctorsWithPagination(
                page,
                size,
                sortBy,
                sortDir
        );
    }

    // =========================
    // ADVANCED SEARCH
    // =========================
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public List<Doctor> searchDoctors(
            @RequestParam("keyword") String keyword) {

        return doctorService.searchDoctors(keyword);
    }

    // =========================
    // SORT BY NAME
    // =========================
    @GetMapping("/sort")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public List<Doctor> getDoctorsSortedByName() {

        return doctorService.getDoctorsSortedByName();
    }

    // =========================
    // UPDATE DOCTOR
    // =========================
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Doctor updateDoctor(
            @PathVariable Long id,
            @Valid @RequestBody Doctor doctor) {

        return doctorService.updateDoctor(
                id,
                doctor
        );
    }

    // =========================
    // DELETE DOCTOR
    // =========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteDoctor(
            @PathVariable Long id) {

        doctorService.deleteDoctor(id);

        return "Doctor deleted successfully";
    }
}