package com.hms.backend.repository;

import com.hms.backend.entity.Appointment;
import com.hms.backend.entity.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Duplicate doctor slot
    boolean existsByDoctorAndAppointmentDateAndAppointmentTime(
            Doctor doctor,
            LocalDate appointmentDate,
            LocalTime appointmentTime
    );

    // Active appointments
    List<Appointment> findByStatus(String status);

    // Appointment count by status
    long countByStatus(String status);

    // Pagination + sorting
    Page<Appointment> findByStatus(
            String status,
            Pageable pageable
    );

    // Search
    @Query("""
            SELECT a
            FROM Appointment a
            WHERE LOWER(a.status) = LOWER(:status)
            AND (
                LOWER(a.patient.firstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(a.patient.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(a.doctor.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(a.doctor.specialization) LIKE LOWER(CONCAT('%', :keyword, '%'))
            )
            """)
    List<Appointment> searchActiveAppointments(
            @Param("status") String status,
            @Param("keyword") String keyword
    );

    // Today's booked appointments
    @Query("""
            SELECT COUNT(a)
            FROM Appointment a
            WHERE a.appointmentDate = :date
            AND a.status = 'BOOKED'
            """)
    long countTodayAppointments(
            @Param("date") LocalDate date
    );
}