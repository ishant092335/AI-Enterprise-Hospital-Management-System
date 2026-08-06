package com.hms.backend.repository;

import com.hms.backend.entity.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    // =========================
    // ACTIVE PATIENTS
    // =========================
    List<Patient> findByStatus(String status);

    // =========================
    // PAGINATION
    // =========================
    Page<Patient> findByStatus(String status, Pageable pageable);

    // =========================
    // SEARCH BY FIRST NAME
    // =========================
    List<Patient> findByStatusAndFirstNameContainingIgnoreCase(
            String status,
            String firstName
    );

    // =========================
    // ENTERPRISE SEARCH
    // =========================
    List<Patient> findByStatusAndFirstNameContainingIgnoreCaseOrStatusAndLastNameContainingIgnoreCaseOrStatusAndEmailContainingIgnoreCaseOrStatusAndPhoneContainingIgnoreCase(
            String status1,
            String firstName,
            String status2,
            String lastName,
            String status3,
            String email,
            String status4,
            String phone
    );
}