package com.hms.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
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

    @NotNull(message = "Lab fee is required")
    @Min(value = 0, message = "Lab fee cannot be negative")
    private Double labFee;

    @NotNull(message = "Other charges are required")
    @Min(value = 0, message = "Other charges cannot be negative")
    private Double otherCharges;

    @NotNull(message = "Discount is required")
    @Min(value = 0, message = "Discount cannot be negative")
    private Double discount;

    @NotNull(message = "Tax is required")
    @Min(value = 0, message = "Tax cannot be negative")
    private Double tax;

    @NotBlank(message = "Payment Method is required")
    private String paymentMethod;

    @NotBlank(message = "Payment Status is required")
    private String paymentStatus;
}