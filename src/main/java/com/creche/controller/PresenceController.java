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
            // Return all presences for accepted children (since only one educateur)
            List<Long> childIds = childRepository.findByStatut("ACCEPTE")
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
        // Allow marking presence for any accepted child
        List<Long> allowedChildIds = childRepository.findByStatut("ACCEPTE")
                .stream().map(c -> c.getId()).toList();

        for (Presence p : presences) {
            if (!allowedChildIds.contains(p.getChild().getId())) {
                throw new org.springframework.security.access.AccessDeniedException(
                        "Cet enfant n'est pas accepté.");
            }
        }
        return presenceRepository.saveAll(presences);
    }
}
