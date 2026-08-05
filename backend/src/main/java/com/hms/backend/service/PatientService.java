package com.hms.backend.service;

import com.hms.backend.entity.Patient;
import com.hms.backend.exception.ResourceNotFoundException;
import com.hms.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // =========================
    // CREATE PATIENT
    // =========================
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // =========================
    // GET ALL ACTIVE PATIENTS
    // =========================
    public List<Patient> getAllPatients() {
        return patientRepository.findByStatus("ACTIVE");
    }

    // =========================
    // GET PATIENT BY ID
    // =========================
    public Patient getPatientById(Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found with id: " + id));

        if ("DELETED".equals(patient.getStatus())) {
            throw new ResourceNotFoundException("Patient not found with id: " + id);
        }

        return patient;
    }

    // =========================
    // UPDATE PATIENT
    // =========================
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

        Pageable pageable = PageRequest.of(page, size, sort);

        return patientRepository.findByStatus("ACTIVE", pageable);
    }

    // =========================
    // ENTERPRISE SEARCH
    // =========================
    public List<Patient> searchPatients(String keyword) {

        return patientRepository
                .findByStatusAndFirstNameContainingIgnoreCaseOrStatusAndLastNameContainingIgnoreCaseOrStatusAndEmailContainingIgnoreCaseOrStatusAndPhoneContainingIgnoreCase(
                        "ACTIVE",
                        keyword,
                        "ACTIVE",
                        keyword,
                        "ACTIVE",
                        keyword,
                        "ACTIVE",
                        keyword
                );
    }

    // =========================
    // SORT ACTIVE PATIENTS
    // =========================
    public List<Patient> getPatientsSortedByFirstName() {

        return patientRepository.findByStatus("ACTIVE")
                .stream()
                .sorted((p1, p2) -> p1.getFirstName().compareToIgnoreCase(p2.getFirstName()))
                .toList();
    }
}