package com.hms.backend.controller;

import com.hms.backend.dto.AppointmentDTO;
import com.hms.backend.entity.Appointment;
import com.hms.backend.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin("*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // =========================
    // CREATE APPOINTMENT
    // =========================
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Appointment addAppointment(
            @Valid @RequestBody Appointment appointment) {

        return appointmentService.saveAppointment(appointment);
    }

    // =========================
    // GET ALL ACTIVE
    // =========================
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public List<Appointment> getAllAppointments() {

        return appointmentService.getAllAppointments();
    }

    // =========================
    // GET BY ID
    // =========================
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public Appointment getAppointmentById(
            @PathVariable Long id) {

        return appointmentService.getAppointmentById(id);
    }

    // =========================
    // BOOK APPOINTMENT
    // =========================
    @PostMapping("/book")
    @PreAuthorize("hasAnyRole('ADMIN','PATIENT')")
    public Appointment bookAppointment(
            @Valid @RequestBody AppointmentDTO dto) {

        return appointmentService.bookAppointment(dto);
    }

    // =========================
    // UPDATE APPOINTMENT
    // =========================
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Appointment updateAppointment(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentDTO dto) {

        return appointmentService.updateAppointment(id, dto);
    }

    // =========================
    // SEARCH
    // =========================
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public List<Appointment> searchAppointments(
            @RequestParam String keyword) {

        return appointmentService.searchAppointments(keyword);
    }

    // =========================
    // PAGINATION + SORTING
    // =========================
    @GetMapping("/page")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public Page<Appointment> getAppointmentsWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "appointmentDate") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        return appointmentService.getAppointmentsWithPagination(
                page,
                size,
                sortBy,
                sortDir
        );
    }

    // =========================
    // DELETE / SOFT DELETE
    // =========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteAppointment(
            @PathVariable Long id) {

        appointmentService.deleteAppointment(id);

        return "Appointment Deleted Successfully";
    }
}