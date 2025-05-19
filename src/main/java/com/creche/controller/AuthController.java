package com.creche.controller;

import com.creche.service.UserService;
import com.creche.model.User;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    // Sign up (register)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            userService.registerUser(request.getUsername(), request.getPassword(), request.getRole());
            return ResponseEntity.ok("User registered successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Login (auth)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.findByUsername(request.getUsername());
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
        if (!userService.checkPassword(user, request.getPassword())) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
        // You can return a token or user info here as needed
        return ResponseEntity.ok("Login successful");
    }

    @Data
    public static class RegisterRequest {
        private String username;
        private String password;
        private String role;
    }

    @Data
    public static class LoginRequest {
        private String username;
        private String password;
    }
}