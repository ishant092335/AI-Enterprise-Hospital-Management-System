package com.hms.backend.controller;

import com.hms.backend.dto.DashboardDTO;
import com.hms.backend.payload.ApiResponse;
import com.hms.backend.service.DashboardService;
import com.hms.backend.util.ApiResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ApiResponse<DashboardDTO> getDashboard() {

        return ApiResponseUtil.success(
                "Dashboard fetched successfully",
                dashboardService.getDashboardData()
        );
    }
}