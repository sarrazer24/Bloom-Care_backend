package com.creche.controller;

import com.creche.model.Presence;
import com.creche.repository.PresenceRepository;
import com.creche.repository.ChildRepository;
import com.creche.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/presences")
public class PresenceController {
    @Autowired
    private PresenceRepository presenceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChildRepository childRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('EDUCATEUR', 'PARENT')")
    public List<Presence> getPresences(
            @RequestParam LocalDate date,
            @AuthenticationPrincipal User principal) {
        String email = principal.getUsername();
        String role = principal.getAuthorities().iterator().next().getAuthority();

        if (role.contains("PARENT")) {
            // Find parent user and their children
            com.creche.model.User parent = userRepository.findByEmail(email);
            List<Long> childIds = childRepository.findByUtilisateurId(parent.getId())
                    .stream().map(c -> c.getId()).toList();
            return presenceRepository.findByDateAndChildIdIn(date, childIds);
        } else if (role.contains("EDUCATEUR")) {
            // Find educateur user and their assigned children
            com.creche.model.User educateur = userRepository.findByEmail(email);
            List<Long> childIds = childRepository.findByEducateurId(educateur.getId())
                    .stream().map(c -> c.getId()).toList();
            return presenceRepository.findByDateAndChildIdIn(date, childIds);
        } else {
            // Default: return nothing
            return List.of();
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('EDUCATEUR')")
    public List<Presence> savePresences(@RequestBody List<Presence> presences,
            @AuthenticationPrincipal User principal) {
        String email = principal.getUsername();
        com.creche.model.User educateur = userRepository.findByEmail(email);

        // Only allow saving presences for children assigned to this educateur
        List<Long> allowedChildIds = childRepository.findByEducateurId(educateur.getId())
                .stream().map(c -> c.getId()).toList();

        for (Presence p : presences) {
            if (!allowedChildIds.contains(p.getChild().getId())) {
                throw new org.springframework.security.access.AccessDeniedException(
                        "Vous n'êtes pas responsable de cet enfant.");
            }
        }
        return presenceRepository.saveAll(presences);
    }
}
