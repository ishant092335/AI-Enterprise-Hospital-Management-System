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
    // GET ALL PATIENTS
    // =========================
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // =========================
    // GET PATIENT BY ID
    // =========================
    public Patient getPatientById(Long id) {

        return patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found with id: " + id));
    }

    // =========================
    // UPDATE PATIENT
    // =========================
    public Patient updatePatient(Long id, Patient updatedPatient) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found with id: " + id));

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
    // DELETE PATIENT
    // =========================
    public void deletePatient(Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found with id: " + id));

        patientRepository.delete(patient);
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

        return patientRepository.findAll(pageable);
    }

    // =========================
    // ENTERPRISE SEARCH
    // =========================
    public List<Patient> searchPatients(String keyword) {

        return patientRepository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneContainingIgnoreCase(
                        keyword,
                        keyword,
                        keyword,
                        keyword
                );
    }

    // =========================
    // SORT BY FIRST NAME
    // =========================
    public List<Patient> getPatientsSortedByFirstName() {

        return patientRepository.findAll(
                Sort.by(Sort.Direction.ASC, "firstName")
        );
    }

}