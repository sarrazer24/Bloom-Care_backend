package com.creche.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String jwtSecret;

    // Example usage in token generation and validation:
    public String generateToken(String email, String role) {
        return io.jsonwebtoken.Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }

    public boolean validateJwtToken(String token) {
        try {
            io.jsonwebtoken.Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getEmailFromToken(String token) {
        return io.jsonwebtoken.Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    // ...other methods...
}