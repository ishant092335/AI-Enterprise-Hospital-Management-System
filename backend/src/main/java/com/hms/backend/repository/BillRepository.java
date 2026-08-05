package com.hms.backend.repository;

import com.hms.backend.entity.Appointment;
import com.hms.backend.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BillRepository extends JpaRepository<Bill, Long> {

    boolean existsByAppointment(Appointment appointment);

    Optional<Bill> findByAppointment(Appointment appointment);

    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Bill b")
    Double getTotalRevenue();
}