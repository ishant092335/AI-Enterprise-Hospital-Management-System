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

    // Invoice Number
    @Column(nullable = false, unique = true)
    private String invoiceNumber;

    // Charges
    @Column(nullable = false)
    private Double consultationFee;

    @Column(nullable = false)
    private Double medicineFee;

    @Column(nullable = false)
    private Double labFee;

    @Column(nullable = false)
    private Double otherCharges;

    // Discount
    @Column(nullable = false)
    private Double discount;

    // Tax (GST)
    @Column(nullable = false)
    private Double tax;

    // Final Amount
    @Column(nullable = false)
    private Double totalAmount;

    // Payment
    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = false)
    private String paymentStatus;

    // Date
    @Column(nullable = false)
    private LocalDate billDate;
}