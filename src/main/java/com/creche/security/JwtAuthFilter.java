package com.creche.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        String token = null;
        String email = null;
        String role = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            if (jwtUtil.validateJwtToken(token)) {
                email = jwtUtil.getEmailFromToken(token);
                // Parse role from token
                io.jsonwebtoken.Claims claims = io.jsonwebtoken.Jwts.parser()
                        .setSigningKey("yourSecretKey") // Use the same secret as in JwtUtil
                        .parseClaimsJws(token)
                        .getBody();
                role = (String) claims.get("role");
            }
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Set authority from role
            java.util.List<SimpleGrantedAuthority> authorities = role != null
                    ? java.util.Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role))
                    : java.util.Collections.emptyList();

            User userDetails = new User(email, "", authorities);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        chain.doFilter(request, response);
    }
}
