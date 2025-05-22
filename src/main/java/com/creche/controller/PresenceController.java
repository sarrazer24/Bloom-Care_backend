package com.creche.controller;

import com.creche.model.Presence;
import com.creche.repository.PresenceRepository;
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

    @GetMapping
    @PreAuthorize("hasAnyRole('EDUCATEUR', 'PARENT')")
    public List<Presence> getPresences(
            @RequestParam LocalDate date,
            @AuthenticationPrincipal User principal) {
        String email = principal.getUsername();
        // If parent, filter by their children
        // If educator, return all
        // (You need to implement user lookup and child filtering logic here)
        return presenceRepository.findByDate(date);
    }

    @PostMapping
    @PreAuthorize("hasRole('EDUCATEUR')")
    public List<Presence> savePresences(@RequestBody List<Presence> presences) {
        return presenceRepository.saveAll(presences);
    }
}
