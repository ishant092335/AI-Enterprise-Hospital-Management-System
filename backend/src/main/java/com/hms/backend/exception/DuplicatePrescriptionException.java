package com.hms.backend.exception;

public class DuplicatePrescriptionException extends RuntimeException {

    public DuplicatePrescriptionException(String message) {
        super(message);
    }
}