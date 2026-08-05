package com.hms.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrescriptionDTO {

    private Long appointmentId;

    private String diagnosis;

    private String medicines;

    private String notes;
}