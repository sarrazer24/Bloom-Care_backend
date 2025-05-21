package com.creche.service;

import com.creche.model.User;
import com.creche.repository.UserRepository;
import com.creche.dto.SignupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // For admin-created users (not parent self-registration)
    public User registerUser(String nom, String email, String motDePasse, String role, String telephone) {
        if (userRepository.findByEmail(email) != null) {
            throw new RuntimeException("Email déjà utilisé.");
        }
        User user = new User();
        user.setNom(nom);
        user.setEmail(email);
        user.setMotDePasse(passwordEncoder.encode(motDePasse));
        user.setRole(role);
        user.setTelephone(telephone); // <-- Add this line
        user.setDateCreation(LocalDateTime.now());
        return userRepository.save(user);
    }

    // For /signup (parent self-registration)
    public User registerParent(SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new RuntimeException("Email déjà utilisé.");
        }
        User user = new User();
        user.setNom(request.getNom());
        user.setEmail(request.getEmail());
        user.setMotDePasse(passwordEncoder.encode(request.getMotDePasse()));
        user.setRole("PARENT");
        user.setTelephone(request.getTelephone()); // <-- Add this line
        user.setDateCreation(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getMotDePasse());
    }

    public boolean hasRole(User user, String role) {
        return user.getRole() != null && user.getRole().equalsIgnoreCase(role);
    }
}