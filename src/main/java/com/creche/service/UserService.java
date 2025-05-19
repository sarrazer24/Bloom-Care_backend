package com.creche.service;

import com.creche.model.User;
import com.creche.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(String username, String password, String role) {
        if (userRepository.findByUsername(username) != null) {
            throw new RuntimeException("Username already exists");
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean checkPassword(User user, String rawPassword) {
        // Utilisation sécurisée du PasswordEncoder pour vérifier le mot de passe
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    // Vérifie si l'utilisateur a un rôle spécifique
    public boolean hasRole(User user, String role) {
        return user.getRole() != null && user.getRole().equalsIgnoreCase(role);
    }
}