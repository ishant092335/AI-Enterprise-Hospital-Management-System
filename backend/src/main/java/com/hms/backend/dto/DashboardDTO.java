package com.hms.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {

    private long totalPatients;

    private long activePatients;

    private long totalDoctors;

    private long totalAppointments;

    private long todayAppointments;

}