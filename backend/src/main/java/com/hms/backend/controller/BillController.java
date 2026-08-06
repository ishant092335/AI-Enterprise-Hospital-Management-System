package com.hms.backend.controller;

import com.hms.backend.dto.BillDTO;
import com.hms.backend.entity.Bill;
import com.hms.backend.payload.ApiResponse;
import com.hms.backend.service.BillService;
import com.hms.backend.util.ApiResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin("*")
public class BillController {

    @Autowired
    private BillService billService;

    // =========================
    // GENERATE BILL
    // =========================
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ApiResponse<Bill> generateBill(@RequestBody BillDTO dto) {

        return ApiResponseUtil.success(
                "Bill generated successfully",
                billService.generateBill(dto)
        );
    }

    // =========================
    // GET ALL BILLS
    // =========================
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<Bill>> getAllBills() {

        return ApiResponseUtil.success(
                "Bills fetched successfully",
                billService.getAllBills()
        );
    }

    // =========================
    // GET BILL BY ID
    // =========================
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ApiResponse<Bill> getBillById(@PathVariable Long id) {

        return ApiResponseUtil.success(
                "Bill fetched successfully",
                billService.getBillById(id)
        );
    }

    // =========================
    // GET BILL BY APPOINTMENT
    // =========================
    @GetMapping("/appointment/{appointmentId}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ApiResponse<Bill> getBillByAppointment(
            @PathVariable Long appointmentId) {

        return ApiResponseUtil.success(
                "Bill fetched successfully",
                billService.getBillByAppointment(appointmentId)
        );
    }

    // =========================
    // DELETE BILL
    // =========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> deleteBill(@PathVariable Long id) {

        billService.deleteBill(id);

        return ApiResponseUtil.success(
                "Bill deleted successfully"
        );
    }
}