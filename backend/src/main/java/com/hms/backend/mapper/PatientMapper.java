package com.hms.backend.mapper;

import com.hms.backend.dto.PatientDTO;
import com.hms.backend.entity.Patient;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PatientMapper {

    PatientDTO toDTO(Patient patient);

    Patient toEntity(PatientDTO patientDTO);
}