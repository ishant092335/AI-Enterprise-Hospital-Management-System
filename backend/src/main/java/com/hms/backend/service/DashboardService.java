package com.hms.backend.service;

import com.hms.backend.dto.DashboardDTO;
import com.hms.backend.repository.AppointmentRepository;
import com.hms.backend.repository.BillRepository;
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

    @Autowired
    private BillRepository billRepository;

    public DashboardDTO getDashboardData() {

        DashboardDTO dashboard = new DashboardDTO();

        // Total Counts
        dashboard.setTotalPatients(patientRepository.count());
        dashboard.setTotalDoctors(doctorRepository.count());
        dashboard.setTotalAppointments(appointmentRepository.count());
        dashboard.setTotalBills(billRepository.count());

        // Total Revenue
        Double revenue = billRepository.getTotalRevenue();
        dashboard.setTotalRevenue(revenue != null ? revenue : 0.0);

        // Today's Appointments
        dashboard.setTodayAppointments(
                appointmentRepository.countTodayAppointments(LocalDate.now())
        );

        return dashboard;
    }
}