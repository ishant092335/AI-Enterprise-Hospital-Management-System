package com.hms.backend.controller;

import com.hms.backend.dto.BillDTO;
import com.hms.backend.entity.Bill;
import com.hms.backend.service.BillService;
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

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public Bill generateBill(@RequestBody BillDTO dto) {
        return billService.generateBill(dto);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public Bill getBillById(@PathVariable Long id) {
        return billService.getBillById(id);
    }

    @GetMapping("/appointment/{appointmentId}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public Bill getBillByAppointment(@PathVariable Long appointmentId) {
        return billService.getBillByAppointment(appointmentId);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteBill(@PathVariable Long id) {
        billService.deleteBill(id);
        return "Bill Deleted Successfully";
    }
}