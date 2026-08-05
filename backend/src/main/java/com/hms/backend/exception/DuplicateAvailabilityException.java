package com.hms.backend.exception;

public class DuplicateAvailabilityException extends RuntimeException {

    public DuplicateAvailabilityException(String message) {
        super(message);
    }
}