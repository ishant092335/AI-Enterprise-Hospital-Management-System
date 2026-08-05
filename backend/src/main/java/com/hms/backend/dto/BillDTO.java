package com.hms.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillDTO {

    @NotNull(message = "Appointment ID is required")
    private Long appointmentId;

    @NotNull(message = "Consultation fee is required")
    @Min(value = 0, message = "Consultation fee cannot be negative")
    private Double consultationFee;

    @NotNull(message = "Medicine fee is required")
    @Min(value = 0, message = "Medicine fee cannot be negative")
    private Double medicineFee;

    @NotNull(message = "Other charges are required")
    @Min(value = 0, message = "Other charges cannot be negative")
    private Double otherCharges;

    @NotNull(message = "Payment status is required")
    private String paymentStatus;
}