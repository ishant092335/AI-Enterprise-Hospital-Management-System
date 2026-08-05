package com.hms.backend.service;

import com.hms.backend.dto.BillDTO;
import com.hms.backend.entity.Appointment;
import com.hms.backend.entity.Bill;
import com.hms.backend.exception.DuplicateBillException;
import com.hms.backend.exception.ResourceNotFoundException;
import com.hms.backend.repository.AppointmentRepository;
import com.hms.backend.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Bill generateBill(BillDTO dto) {

        Appointment appointment = appointmentRepository.findById(dto.getAppointmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found with id: " + dto.getAppointmentId()));

        if (billRepository.existsByAppointment(appointment)) {
            throw new DuplicateBillException(
                    "Bill already exists for this appointment.");
        }

        double total = dto.getConsultationFee()
                + dto.getMedicineFee()
                + dto.getOtherCharges();

        Bill bill = Bill.builder()
                .appointment(appointment)
                .consultationFee(dto.getConsultationFee())
                .medicineFee(dto.getMedicineFee())
                .otherCharges(dto.getOtherCharges())
                .totalAmount(total)
                .billDate(LocalDate.now())
                .paymentStatus(dto.getPaymentStatus())
                .build();

        return billRepository.save(bill);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public Bill getBillById(Long id) {
        return billRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Bill not found with id: " + id));
    }

    public Bill getBillByAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found with id: " + appointmentId));

        return billRepository.findByAppointment(appointment)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Bill not found for Appointment ID: " + appointmentId));
    }

    public void deleteBill(Long id) {

        Bill bill = billRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Bill not found with id: " + id));

        billRepository.delete(bill);
    }
}