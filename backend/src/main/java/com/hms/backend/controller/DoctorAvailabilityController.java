package com.hms.backend.controller;

import com.hms.backend.entity.DoctorAvailability;
import com.hms.backend.service.DoctorAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.util.List;

@RestController
@RequestMapping("/api/availability")
@CrossOrigin("*")
public class DoctorAvailabilityController {

    @Autowired
    private DoctorAvailabilityService availabilityService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public DoctorAvailability addAvailability(
            @RequestBody DoctorAvailability availability) {

        return availabilityService.saveAvailability(availability);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public List<DoctorAvailability> getAllAvailability() {
        return availabilityService.getAllAvailability();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public DoctorAvailability getAvailabilityById(
            @PathVariable Long id) {

        return availabilityService.getAvailabilityById(id);
    }

    @GetMapping("/doctor/{doctorId}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public List<DoctorAvailability> getAvailabilityByDoctor(
            @PathVariable Long doctorId) {

        return availabilityService.getAvailabilityByDoctor(doctorId);
    }

    @GetMapping("/doctor/{doctorId}/{day}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public List<DoctorAvailability> getAvailabilityByDoctorAndDay(
            @PathVariable Long doctorId,
            @PathVariable DayOfWeek day) {

        return availabilityService.getAvailabilityByDoctorAndDay(
                doctorId,
                day
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteAvailability(
            @PathVariable Long id) {

        availabilityService.deleteAvailability(id);

        return "Availability Deleted Successfully";
    }
}