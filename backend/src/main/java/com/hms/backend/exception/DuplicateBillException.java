package com.hms.backend.exception;

public class DuplicateBillException extends RuntimeException {

    public DuplicateBillException(String message) {
        super(message);
    }
}