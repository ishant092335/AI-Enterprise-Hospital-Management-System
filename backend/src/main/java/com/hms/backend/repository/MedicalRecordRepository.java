package com.hms.backend.repository;

import com.hms.backend.entity.Appointment;
import com.hms.backend.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MedicalRecordRepository
        extends JpaRepository<MedicalRecord, Long> {

    Optional<MedicalRecord> findByAppointment(Appointment appointment);

    boolean existsByAppointment(Appointment appointment);
}