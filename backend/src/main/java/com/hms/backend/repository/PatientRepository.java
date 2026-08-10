package com.hms.backend.repository;

import com.hms.backend.entity.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    // Active patients
    List<Patient> findByStatus(String status);

    // Pagination + Sorting
    Page<Patient> findByStatus(String status, Pageable pageable);

    // Search by First Name
    List<Patient> findByStatusAndFirstNameContainingIgnoreCase(
            String status,
            String firstName
    );

    // Search by Last Name
    List<Patient> findByStatusAndLastNameContainingIgnoreCase(
            String status,
            String lastName
    );

    // Search by Email
    List<Patient> findByStatusAndEmailContainingIgnoreCase(
            String status,
            String email
    );

    // Search by Phone
    List<Patient> findByStatusAndPhoneContaining(
            String status,
            String phone
    );

    // Search by Patient ID
    List<Patient> findByStatusAndId(
            String status,
            Long id
    );

    // Search by Age
    List<Patient> findByStatusAndAge(
            String status,
            Integer age
    );

    // Dashboard count
    long countByStatus(String status);
}