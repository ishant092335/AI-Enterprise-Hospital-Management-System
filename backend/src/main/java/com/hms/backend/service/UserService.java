package com.hms.backend.service;

import com.hms.backend.dto.LoginRequest;
import com.hms.backend.dto.LoginResponse;
import com.hms.backend.entity.User;
import com.hms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {

        // Password ko hash karke save karenge
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
            return null;
        }

        // Plain password ki jagah BCrypt compare
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return null;
        }

        String token = jwtService.generateToken(user.getUsername());

        return new LoginResponse(token);
    }
}