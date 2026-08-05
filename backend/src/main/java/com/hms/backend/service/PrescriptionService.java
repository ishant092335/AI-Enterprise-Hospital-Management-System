package com.hms.backend.service;

import com.hms.backend.dto.PrescriptionDTO;
import com.hms.backend.entity.Appointment;
import com.hms.backend.entity.Prescription;
import com.hms.backend.exception.DuplicatePrescriptionException;
import com.hms.backend.exception.ResourceNotFoundException;
import com.hms.backend.repository.AppointmentRepository;
import com.hms.backend.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Prescription savePrescription(PrescriptionDTO dto) {

        Appointment appointment = appointmentRepository.findById(dto.getAppointmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found with id: " + dto.getAppointmentId()));

        if (prescriptionRepository.existsByAppointment(appointment)) {
            throw new DuplicatePrescriptionException(
                    "Prescription already exists for this appointment.");
        }

        Prescription prescription = Prescription.builder()
                .appointment(appointment)
                .diagnosis(dto.getDiagnosis())
                .medicines(dto.getMedicines())
                .notes(dto.getNotes())
                .build();

        return prescriptionRepository.save(prescription);
    }

    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    public Prescription getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Prescription not found with id: " + id));
    }

    public Prescription getPrescriptionByAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found with id: " + appointmentId));

        return prescriptionRepository.findByAppointment(appointment)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Prescription not found for Appointment ID: " + appointmentId));
    }

    public void deletePrescription(Long id) {

        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Prescription not found with id: " + id));

        prescriptionRepository.delete(prescription);
    }
}