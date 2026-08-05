package com.hms.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "bills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bill extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "appointment_id", nullable = false, unique = true)
    private Appointment appointment;

    @Column(nullable = false)
    private Double consultationFee;

    @Column(nullable = false)
    private Double medicineFee;

    @Column(nullable = false)
    private Double otherCharges;

    @Column(nullable = false)
    private Double totalAmount;

    @Column(nullable = false)
    private LocalDate billDate;

    @Column(nullable = false)
    private String paymentStatus;
}