package com.hms.backend.service;

import com.hms.backend.entity.Patient;
import com.hms.backend.exception.ResourceNotFoundException;
import com.hms.backend.repository.PatientRepository;
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
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // =========================
    // CREATE PATIENT
    // =========================
    @CacheEvict(value = {"patients"}, allEntries = true)
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // =========================
    // GET ALL ACTIVE PATIENTS
    // =========================
    @Cacheable(value = "patients")
    public List<Patient> getAllPatients() {
        return patientRepository.findByStatus("ACTIVE");
    }

    // =========================
    // GET PATIENT BY ID
    // =========================
    @Cacheable(value = "patient", key = "#id")
    public Patient getPatientById(Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id: " + id
                        )
                );

        if ("DELETED".equals(patient.getStatus())) {
            throw new ResourceNotFoundException(
                    "Patient not found with id: " + id
            );
        }

        return patient;
    }

    // =========================
    // UPDATE PATIENT
    // =========================
    @CacheEvict(value = {"patients", "patient"}, allEntries = true)
    public Patient updatePatient(Long id, Patient updatedPatient) {

        Patient patient = getPatientById(id);

        patient.setFirstName(updatedPatient.getFirstName());
        patient.setLastName(updatedPatient.getLastName());
        patient.setAge(updatedPatient.getAge());
        patient.setGender(updatedPatient.getGender());
        patient.setEmail(updatedPatient.getEmail());
        patient.setPhone(updatedPatient.getPhone());
        patient.setBloodGroup(updatedPatient.getBloodGroup());
        patient.setAddress(updatedPatient.getAddress());

        return patientRepository.save(patient);
    }

    // =========================
    // SOFT DELETE
    // =========================
    @CacheEvict(value = {"patients", "patient"}, allEntries = true)
    public void deletePatient(Long id) {

        Patient patient = getPatientById(id);

        patient.setStatus("DELETED");

        patientRepository.save(patient);
    }

    // =========================
    // PAGINATION + SORTING
    // =========================
    public Page<Patient> getPatientsWithPagination(
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

        return patientRepository.findByStatus(
                "ACTIVE",
                pageable
        );
    }

    // =========================
    // ENTERPRISE SEARCH
    // NAME + EMAIL + PHONE + ID + AGE
    // =========================
    public List<Patient> searchPatients(String keyword) {

        List<Patient> results = new ArrayList<>();

        if (keyword == null || keyword.trim().isEmpty()) {
            return patientRepository.findByStatus("ACTIVE");
        }

        keyword = keyword.trim();

        // First Name
        results.addAll(
                patientRepository
                        .findByStatusAndFirstNameContainingIgnoreCase(
                                "ACTIVE",
                                keyword
                        )
        );

        // Last Name
        results.addAll(
                patientRepository
                        .findByStatusAndLastNameContainingIgnoreCase(
                                "ACTIVE",
                                keyword
                        )
        );

        // Email
        results.addAll(
                patientRepository
                        .findByStatusAndEmailContainingIgnoreCase(
                                "ACTIVE",
                                keyword
                        )
        );

        // Phone
        results.addAll(
                patientRepository
                        .findByStatusAndPhoneContaining(
                                "ACTIVE",
                                keyword
                        )
        );

        // ID + Age
        try {
            Long id = Long.parseLong(keyword);

            results.addAll(
                    patientRepository.findByStatusAndId(
                            "ACTIVE",
                            id
                    )
            );
        } catch (NumberFormatException ignored) {
            // Keyword is not a valid ID
        }

        try {
            Integer age = Integer.parseInt(keyword);

            results.addAll(
                    patientRepository.findByStatusAndAge(
                            "ACTIVE",
                            age
                    )
            );
        } catch (NumberFormatException ignored) {
            // Keyword is not a valid age
        }

        // Remove duplicate patients
        return results.stream()
                .distinct()
                .toList();
    }

    // =========================
    // SORT ACTIVE PATIENTS
    // =========================
    public List<Patient> getPatientsSortedByFirstName() {

        return patientRepository
                .findByStatus("ACTIVE")
                .stream()
                .sorted(
                        (p1, p2) ->
                                p1.getFirstName()
                                        .compareToIgnoreCase(
                                                p2.getFirstName()
                                        )
                )
                .toList();
    }
}