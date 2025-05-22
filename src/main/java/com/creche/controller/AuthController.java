package com.creche.controller;

import com.creche.service.UserService;
import com.creche.model.User;
import com.creche.security.JwtUtil;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.creche.dto.SignupRequest;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;
import org.springframework.security.access.prepost.PreAuthorize;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // Admin creates any user (except parent self-registration)
    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
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
                    request.getTelephone());
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
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return ResponseEntity.ok(new LoginResponse(user.getNom(), user.getRole(), token));
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

    // Request password reset (send email)
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("Aucun utilisateur avec cet email.");
        }
        String token = UUID.randomUUID().toString();
        userService.createPasswordResetToken(user, token);

        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        userService.sendResetEmail(user.getEmail(), resetLink);

        return ResponseEntity.ok("Un lien de réinitialisation a été envoyé à votre adresse email.");
    }

    // Reset password
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        System.out.println("RESET REQUEST: " + request);
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body(
                    java.util.Collections.singletonMap("message", "Les mots de passe ne correspondent pas."));
        }
        boolean result = userService.resetPassword(request.getToken(), request.getNewPassword());
        if (result) {
            return ResponseEntity.ok(
                    java.util.Collections.singletonMap("message", "Mot de passe réinitialisé avec succès."));
        } else {
            return ResponseEntity.badRequest().body(
                    java.util.Collections.singletonMap("message", "Lien invalide ou expiré."));
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
        private String telephone;
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
        private final String token;
    }

    // DTO for reset password
    @Data
    public static class ResetPasswordRequest {
        @NotBlank
        private String token;
        @NotBlank
        private String newPassword;
        @NotBlank
        private String confirmPassword;
    }
}