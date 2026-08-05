package com.hms.backend.repository;

import com.hms.backend.entity.Doctor;
import com.hms.backend.entity.DoctorAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

public interface DoctorAvailabilityRepository extends JpaRepository<DoctorAvailability, Long> {

    List<DoctorAvailability> findByDoctor(Doctor doctor);

    List<DoctorAvailability> findByDoctorAndDayOfWeek(
            Doctor doctor,
            DayOfWeek dayOfWeek
    );

    boolean existsByDoctorAndDayOfWeekAndStartTimeLessThanAndEndTimeGreaterThan(
            Doctor doctor,
            DayOfWeek dayOfWeek,
            LocalTime endTime,
            LocalTime startTime
    );
}