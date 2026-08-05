package com.hms.backend.config;

import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationProvider {

    public boolean validateToken(String token) {

        // Abhi validation JwtService se hogi.
        // Is class ko next step me use karenge.
        return token != null && !token.isEmpty();
    }
}