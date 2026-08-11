package com.hms.backend.service;

import com.hms.backend.dto.AppointmentDTO;
import com.hms.backend.entity.Appointment;
import com.hms.backend.entity.Doctor;
import com.hms.backend.entity.Patient;
import com.hms.backend.exception.DuplicateAppointmentException;
import com.hms.backend.exception.ResourceNotFoundException;
import com.hms.backend.repository.AppointmentRepository;
import com.hms.backend.repository.DoctorRepository;
import com.hms.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    // =========================
    // CREATE / BOOK APPOINTMENT
    // =========================
    public Appointment saveAppointment(Appointment appointment) {

        if (appointment.getPatient() == null ||
                appointment.getPatient().getId() == null) {
            throw new ResourceNotFoundException("Patient ID is required");
        }

        if (appointment.getDoctor() == null ||
                appointment.getDoctor().getId() == null) {
            throw new ResourceNotFoundException("Doctor ID is required");
        }

        Patient patient = patientRepository.findById(
                appointment.getPatient().getId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "Patient not found with id: "
                                + appointment.getPatient().getId()
                )
        );

        Doctor doctor = doctorRepository.findById(
                appointment.getDoctor().getId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "Doctor not found with id: "
                                + appointment.getDoctor().getId()
                )
        );

        boolean alreadyBooked =
                appointmentRepository
                        .existsByDoctorAndAppointmentDateAndAppointmentTime(
                                doctor,
                                appointment.getAppointmentDate(),
                                appointment.getAppointmentTime()
                        );

        if (alreadyBooked) {
            throw new DuplicateAppointmentException(
                    "Doctor is already booked for this date and time."
            );
        }

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        if (appointment.getStatus() == null ||
                appointment.getStatus().isBlank()) {
            appointment.setStatus("BOOKED");
        }

        return appointmentRepository.save(appointment);
    }

    // =========================
    // GET ALL ACTIVE APPOINTMENTS
    // =========================
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findByStatus("BOOKED");
    }

    // =========================
    // GET APPOINTMENT BY ID
    // =========================
    public Appointment getAppointmentById(Long id) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found with id: " + id
                        ));

        if ("DELETED".equalsIgnoreCase(appointment.getStatus())) {
            throw new ResourceNotFoundException(
                    "Appointment not found with id: " + id
            );
        }

        return appointment;
    }

    // =========================
    // UPDATE APPOINTMENT
    // =========================
    public Appointment updateAppointment(
            Long id,
            AppointmentDTO dto
    ) {

        Appointment appointment = getAppointmentById(id);

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id: "
                                        + dto.getPatientId()
                        ));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: "
                                        + dto.getDoctorId()
                        ));

        boolean slotChanged =
                !doctor.getId().equals(appointment.getDoctor().getId())
                        || !dto.getAppointmentDate()
                        .equals(appointment.getAppointmentDate())
                        || !dto.getAppointmentTime()
                        .equals(appointment.getAppointmentTime());

        if (slotChanged) {

            boolean alreadyBooked =
                    appointmentRepository
                            .existsByDoctorAndAppointmentDateAndAppointmentTime(
                                    doctor,
                                    dto.getAppointmentDate(),
                                    dto.getAppointmentTime()
                            );

            if (alreadyBooked) {
                throw new DuplicateAppointmentException(
                        "Doctor is already booked for this date and time."
                );
            }
        }

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setAppointmentTime(dto.getAppointmentTime());

        if (dto.getStatus() != null &&
                !dto.getStatus().isBlank()) {
            appointment.setStatus(dto.getStatus());
        }

        return appointmentRepository.save(appointment);
    }

    // =========================
    // DELETE APPOINTMENT
    // =========================
    public void deleteAppointment(Long id) {

        Appointment appointment = getAppointmentById(id);

        // Soft delete
        appointment.setStatus("DELETED");

        appointmentRepository.save(appointment);
    }

    // =========================
    // BOOK APPOINTMENT USING DTO
    // =========================
    public Appointment bookAppointment(AppointmentDTO dto) {

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id: "
                                        + dto.getPatientId()
                        ));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: "
                                        + dto.getDoctorId()
                        ));

        boolean alreadyBooked =
                appointmentRepository
                        .existsByDoctorAndAppointmentDateAndAppointmentTime(
                                doctor,
                                dto.getAppointmentDate(),
                                dto.getAppointmentTime()
                        );

        if (alreadyBooked) {
            throw new DuplicateAppointmentException(
                    "Doctor is already booked for this date and time."
            );
        }

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .appointmentDate(dto.getAppointmentDate())
                .appointmentTime(dto.getAppointmentTime())
                .status(
                        dto.getStatus() == null ||
                                dto.getStatus().isBlank()
                                ? "BOOKED"
                                : dto.getStatus()
                )
                .build();

        return appointmentRepository.save(appointment);
    }

    // =========================
    // SEARCH
    // =========================
    public List<Appointment> searchAppointments(String keyword) {

        return appointmentRepository.searchActiveAppointments(
                "BOOKED",
                keyword
        );
    }

    // =========================
    // PAGINATION + SORTING
    // =========================
    public Page<Appointment> getAppointmentsWithPagination(
            int page,
            int size,
            String sortBy,
            String sortDir
    ) {

        Sort sort = sortDir.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(
                page,
                size,
                sort
        );

        return appointmentRepository.findByStatus(
                "BOOKED",
                pageable
        );
    }
}