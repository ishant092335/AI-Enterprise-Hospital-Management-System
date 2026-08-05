package com.hms.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardDTO {

    private long totalPatients;

    private long totalDoctors;

    private long totalAppointments;

    private long totalBills;

    private double totalRevenue;

    private long todayAppointments;
}