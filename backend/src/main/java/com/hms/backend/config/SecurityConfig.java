package com.hms.backend.config;

import com.hms.backend.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(cors -> {})   // ✅ CORS Enabled
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .exceptionHandling(exception ->
                        exception.authenticationEntryPoint(jwtAuthenticationEntryPoint))

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                "/api/users/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**"
                        ).permitAll()

                        .requestMatchers("/api/doctors/**")
                        .hasAnyRole("ADMIN", "DOCTOR", "PATIENT")

                        .requestMatchers("/api/patients/**")
                        .hasAnyRole("ADMIN", "PATIENT")

                        .requestMatchers("/api/appointments/**")
                        .hasAnyRole("ADMIN", "DOCTOR", "PATIENT")

                        .requestMatchers("/api/doctor-availability/**")
                        .hasAnyRole("ADMIN", "DOCTOR")

                        .requestMatchers("/api/prescriptions/**")
                        .hasAnyRole("ADMIN", "DOCTOR", "PATIENT")

                        .requestMatchers("/api/bills/**")
                        .hasAnyRole("ADMIN", "DOCTOR", "PATIENT")

                        .requestMatchers("/api/medical-records/**")
                        .hasAnyRole("ADMIN", "DOCTOR", "PATIENT")

                        .requestMatchers("/api/dashboard/**")
                        .hasAnyRole("ADMIN", "DOCTOR")

                        .anyRequest()
                        .authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }
}