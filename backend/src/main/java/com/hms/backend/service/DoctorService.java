package com.hms.backend.service;

import com.hms.backend.entity.Doctor;
import com.hms.backend.exception.ResourceNotFoundException;
import com.hms.backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    // =========================
    // CREATE DOCTOR
    // =========================
    @CacheEvict(value = "doctors", allEntries = true)
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // =========================
    // GET ALL ACTIVE DOCTORS
    // =========================
    @Cacheable(value = "doctors")
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findByStatus("ACTIVE");
    }

    // =========================
    // GET DOCTOR BY ID
    // =========================
    @Cacheable(value = "doctor", key = "#id")
    public Doctor getDoctorById(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: " + id
                        )
                );

        if ("DELETED".equals(doctor.getStatus())) {
            throw new ResourceNotFoundException(
                    "Doctor not found with id: " + id
            );
        }

        return doctor;
    }

    // =========================
    // UPDATE DOCTOR
    // =========================
    @CacheEvict(value = {"doctors", "doctor"}, allEntries = true)
    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {

        Doctor doctor = getDoctorById(id);

        doctor.setName(updatedDoctor.getName());
        doctor.setSpecialization(updatedDoctor.getSpecialization());
        doctor.setEmail(updatedDoctor.getEmail());
        doctor.setPhone(updatedDoctor.getPhone());
        doctor.setExperience(updatedDoctor.getExperience());
        doctor.setQualification(updatedDoctor.getQualification());

        return doctorRepository.save(doctor);
    }

    // =========================
    // SOFT DELETE
    // =========================
    @CacheEvict(value = {"doctors", "doctor"}, allEntries = true)
    public void deleteDoctor(Long id) {

        Doctor doctor = getDoctorById(id);

        doctor.setStatus("DELETED");

        doctorRepository.save(doctor);
    }

    // =========================
    // PAGINATION + SORTING
    // =========================
    public Page<Doctor> getDoctorsWithPagination(
            int page,
            int size,
            String sortBy,
            String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(
                page,
                size,
                sort
        );

        return doctorRepository.findByStatus(
                "ACTIVE",
                pageable
        );
    }

    // =========================
    // ADVANCED SEARCH
    // NAME + SPECIALIZATION +
    // EMAIL + PHONE + ID + EXPERIENCE
    // =========================
    public List<Doctor> searchDoctors(String keyword) {

        List<Doctor> results = new ArrayList<>();

        if (keyword == null || keyword.trim().isEmpty()) {
            return doctorRepository.findByStatus("ACTIVE");
        }

        keyword = keyword.trim();

        results.addAll(
                doctorRepository
                        .findByStatusAndNameContainingIgnoreCase(
                                "ACTIVE",
                                keyword
                        )
        );

        results.addAll(
                doctorRepository
                        .findByStatusAndSpecializationContainingIgnoreCase(
                                "ACTIVE",
                                keyword
                        )
        );

        results.addAll(
                doctorRepository
                        .findByStatusAndEmailContainingIgnoreCase(
                                "ACTIVE",
                                keyword
                        )
        );

        results.addAll(
                doctorRepository
                        .findByStatusAndPhoneContaining(
                                "ACTIVE",
                                keyword
                        )
        );

        try {
            Long id = Long.parseLong(keyword);

            results.addAll(
                    doctorRepository.findByStatusAndId(
                            "ACTIVE",
                            id
                    )
            );
        } catch (NumberFormatException ignored) {
            // Not an ID
        }

        try {
            Integer experience = Integer.parseInt(keyword);

            results.addAll(
                    doctorRepository.findByStatusAndExperience(
                            "ACTIVE",
                            experience
                    )
            );
        } catch (NumberFormatException ignored) {
            // Not experience
        }

        return results.stream()
                .distinct()
                .toList();
    }

    // =========================
    // SORT BY NAME
    // =========================
    public List<Doctor> getDoctorsSortedByName() {

        return doctorRepository.findByStatus("ACTIVE")
                .stream()
                .sorted(
                        (d1, d2) ->
                                d1.getName()
                                        .compareToIgnoreCase(d2.getName())
                )
                .toList();
    }
}