package com.creche.service;

import com.creche.model.PasswordResetToken;
import com.creche.model.User;
import com.creche.repository.PasswordResetTokenRepository;
import com.creche.repository.UserRepository;
import com.creche.dto.SignupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import javax.mail.MessagingException;
import org.springframework.mail.javamail.MimeMessageHelper;
import javax.mail.internet.MimeMessage;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private org.springframework.mail.javamail.JavaMailSender mailSender;

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

    // Create a password reset token for a user
    public void createPasswordResetToken(User user, String token) {
        PasswordResetToken prt = new PasswordResetToken();
        prt.setUser(user);
        prt.setToken(token);
        prt.setExpiry(LocalDateTime.now().plusHours(1));
        tokenRepository.save(prt);
    }

    // Send the reset email
    public void sendResetEmail(String to, String link) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject("Réinitialisation du mot de passe");
            helper.setText(
                    "<p>Cliquez sur ce lien pour réinitialiser votre mot de passe :</p>" +
                            "<p><a href=\"" + link + "\">" + link + "</a></p>",
                    true // enable HTML
            );
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Erreur lors de l'envoi de l'email.");
        }
    }

    // Reset the password using the token
    public boolean resetPassword(String token, String newPassword) {
        PasswordResetToken prt = tokenRepository.findByToken(token);
        if (prt == null || prt.getExpiry().isBefore(java.time.LocalDateTime.now())) {
            return false;
        }
        User user = prt.getUser();
        user.setMotDePasse(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        tokenRepository.delete(prt);
        return true;
    }
}