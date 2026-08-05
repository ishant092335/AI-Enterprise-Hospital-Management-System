package com.hms.backend.repository;

import com.hms.backend.entity.Appointment;
import com.hms.backend.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    Optional<Prescription> findByAppointment(Appointment appointment);

    boolean existsByAppointment(Appointment appointment);
}