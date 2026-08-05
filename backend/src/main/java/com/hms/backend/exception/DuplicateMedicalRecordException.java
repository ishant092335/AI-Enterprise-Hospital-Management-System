package com.hms.backend.exception;

public class DuplicateMedicalRecordException extends RuntimeException {

    public DuplicateMedicalRecordException(String message) {
        super(message);
    }
}