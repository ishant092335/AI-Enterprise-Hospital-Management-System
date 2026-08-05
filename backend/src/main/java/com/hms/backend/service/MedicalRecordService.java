package com.hms.backend.service;

import com.hms.backend.entity.Appointment;
import com.hms.backend.entity.MedicalRecord;
import com.hms.backend.exception.ResourceNotFoundException;
import com.hms.backend.exception.DuplicateMedicalRecordException;
import com.hms.backend.repository.AppointmentRepository;
import com.hms.backend.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public MedicalRecord saveMedicalRecord(MedicalRecord medicalRecord) {

        Long appointmentId = medicalRecord.getAppointment().getId();

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found with id: " + appointmentId));

        if (medicalRecordRepository.existsByAppointment(appointment)) {
            throw new DuplicateMedicalRecordException(
                    "Medical Record already exists for this appointment.");
        }

        medicalRecord.setAppointment(appointment);

        return medicalRecordRepository.save(medicalRecord);
    }

    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordRepository.findAll();
    }

    public MedicalRecord getMedicalRecordById(Long id) {
        return medicalRecordRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Medical Record not found with id: " + id));
    }

    public MedicalRecord getMedicalRecordByAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found with id: " + appointmentId));

        return medicalRecordRepository.findByAppointment(appointment)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Medical Record not found for Appointment ID: " + appointmentId));
    }

    public void deleteMedicalRecord(Long id) {

        MedicalRecord medicalRecord = medicalRecordRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Medical Record not found with id: " + id));

        medicalRecordRepository.delete(medicalRecord);
    }
}