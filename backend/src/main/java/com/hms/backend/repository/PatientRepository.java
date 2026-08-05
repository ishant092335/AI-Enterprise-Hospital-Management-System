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
    // GET ALL ACTIVE PATIENTS
    // =========================
    List<Patient> findByStatus(String status);

    // =========================
    // PAGINATION FOR ACTIVE PATIENTS
    // =========================
    Page<Patient> findByStatus(String status, Pageable pageable);

    // =========================
    // ENTERPRISE SEARCH (ACTIVE ONLY)
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