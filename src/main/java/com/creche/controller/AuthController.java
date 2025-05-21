package com.creche.controller;

import com.creche.service.UserService;
import com.creche.model.User;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.creche.dto.SignupRequest;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    // Admin creates any user (except parent self-registration)
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (request.getRole().equalsIgnoreCase("PARENT")) {
            return ResponseEntity.badRequest().body("Utilisez /signup pour l'inscription des parents.");
        }
        try {
            userService.registerUser(
                    request.getNom(),
                    request.getEmail(),
                    request.getMotDePasse(),
                    request.getRole(),
                    request.getTelephone() // <-- Add this argument
            );
            return ResponseEntity.ok("Utilisateur créé avec succès");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Login (auth)
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        User user = userService.findByEmail(request.getEmail());
        if (user == null || !userService.checkPassword(user, request.getMotDePasse())) {
            return ResponseEntity.status(401).body("Email ou mot de passe invalide");
        }
        return ResponseEntity.ok(new LoginResponse(user.getNom(), user.getRole()));
    }

    // Parent self-registration
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        if (!request.getRole().equalsIgnoreCase("PARENT")) {
            return ResponseEntity.badRequest().body("Seuls les parents peuvent s’inscrire eux-mêmes.");
        }
        try {
            userService.registerParent(request);
            return ResponseEntity.ok("Inscription réussie !");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Data
    public static class RegisterRequest {
        @NotBlank
        private String nom;
        @NotBlank
        @Email
        private String email;
        @NotBlank
        @Size(min = 6)
        private String motDePasse;
        @NotBlank
        private String role;
        @NotBlank
        @Size(min = 10, max = 20)
        private String telephone; // <-- Add this line
    }

    @Data
    public static class LoginRequest {
        @NotBlank
        @Email
        private String email;
        @NotBlank
        private String motDePasse;
    }

    @Data
    public static class LoginResponse {
        private final String nom;
        private final String role;
    }
}