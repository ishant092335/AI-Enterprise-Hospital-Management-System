package com.hms.backend.service;

import com.hms.backend.dto.DashboardDTO;
import com.hms.backend.repository.AppointmentRepository;
import com.hms.backend.repository.DoctorRepository;
import com.hms.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DashboardService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public DashboardDTO getDashboardData() {

        return DashboardDTO.builder()
                .totalPatients(patientRepository.count())
                .activePatients(patientRepository.countByStatus("ACTIVE"))
                .totalDoctors(doctorRepository.count())
                .totalAppointments(appointmentRepository.count())
                .todayAppointments(
                        appointmentRepository.countTodayAppointments(LocalDate.now())
                )
                .build();
    }
}