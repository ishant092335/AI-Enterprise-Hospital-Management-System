package com.hms.backend.repository;

import com.hms.backend.entity.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // =========================
    // ACTIVE DOCTORS
    // =========================
    List<Doctor> findByStatus(String status);

    // =========================
    // PAGINATION + SORTING
    // =========================
    Page<Doctor> findByStatus(
            String status,
            Pageable pageable
    );

    // =========================
    // SEARCH BY NAME
    // =========================
    List<Doctor> findByStatusAndNameContainingIgnoreCase(
            String status,
            String name
    );

    // =========================
    // SEARCH BY SPECIALIZATION
    // =========================
    List<Doctor> findByStatusAndSpecializationContainingIgnoreCase(
            String status,
            String specialization
    );

    // =========================
    // SEARCH BY EMAIL
    // =========================
    List<Doctor> findByStatusAndEmailContainingIgnoreCase(
            String status,
            String email
    );

    // =========================
    // SEARCH BY PHONE
    // =========================
    List<Doctor> findByStatusAndPhoneContaining(
            String status,
            String phone
    );

    // =========================
    // SEARCH BY ID
    // =========================
    List<Doctor> findByStatusAndId(
            String status,
            Long id
    );

    // =========================
    // SEARCH BY EXPERIENCE
    // =========================
    List<Doctor> findByStatusAndExperience(
            String status,
            Integer experience
    );

    // =========================
    // DASHBOARD
    // =========================
    long countByStatus(String status);

}