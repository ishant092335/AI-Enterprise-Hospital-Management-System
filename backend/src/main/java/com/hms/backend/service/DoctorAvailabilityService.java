package com.hms.backend.service;

import com.hms.backend.entity.Doctor;
import com.hms.backend.entity.DoctorAvailability;
import com.hms.backend.exception.ResourceNotFoundException;
import com.hms.backend.repository.DoctorAvailabilityRepository;
import com.hms.backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;

@Service
public class DoctorAvailabilityService {

    @Autowired
    private DoctorAvailabilityRepository availabilityRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public DoctorAvailability saveAvailability(DoctorAvailability availability) {

        Long doctorId = availability.getDoctor().getId();

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found with id: " + doctorId));

        // Validation: End Time must be after Start Time
        if (!availability.getEndTime().isAfter(availability.getStartTime())) {
            throw new IllegalArgumentException("End time must be after start time.");
        }

        // Validation: Slot Duration must be greater than 0
        if (availability.getSlotDuration() == null || availability.getSlotDuration() <= 0) {
            throw new IllegalArgumentException("Slot duration must be greater than 0.");
        }

        // Validation: Overlapping Availability
        boolean exists = availabilityRepository
                .existsByDoctorAndDayOfWeekAndStartTimeLessThanAndEndTimeGreaterThan(
                        doctor,
                        availability.getDayOfWeek(),
                        availability.getEndTime(),
                        availability.getStartTime()
                );

        if (exists) {
            throw new IllegalArgumentException(
                    "Doctor already has availability during this time."
            );
        }

        availability.setDoctor(doctor);

        return availabilityRepository.save(availability);
    }

    public List<DoctorAvailability> getAllAvailability() {
        return availabilityRepository.findAll();
    }

    public DoctorAvailability getAvailabilityById(Long id) {
        return availabilityRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Availability not found with id: " + id));
    }

    public List<DoctorAvailability> getAvailabilityByDoctor(Long doctorId) {

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found with id: " + doctorId));

        return availabilityRepository.findByDoctor(doctor);
    }

    public List<DoctorAvailability> getAvailabilityByDoctorAndDay(
            Long doctorId,
            DayOfWeek dayOfWeek) {

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found with id: " + doctorId));

        return availabilityRepository.findByDoctorAndDayOfWeek(
                doctor,
                dayOfWeek
        );
    }

    public void deleteAvailability(Long id) {

        DoctorAvailability availability = availabilityRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Availability not found with id: " + id));

        availabilityRepository.delete(availability);
    }
}