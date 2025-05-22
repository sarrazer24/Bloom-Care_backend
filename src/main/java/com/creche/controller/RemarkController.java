package com.creche.controller;

import com.creche.model.Child;
import com.creche.model.Remark;
import com.creche.repository.RemarkRepository;
import com.creche.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/remarks")
public class RemarkController {
    @Autowired
    private RemarkRepository remarkRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('EDUCATEUR','PARENT')")
    public List<Remark> getRemarks(@RequestParam LocalDate date, @AuthenticationPrincipal User principal) {
        String email = principal.getUsername();
        com.creche.model.User user = userRepository.findByEmail(email);
        if (user.getRole().equalsIgnoreCase("PARENT")) {
            // Only remarks for their children
            List<Long> childIds = user.getChildren().stream().map(Child::getId).collect(Collectors.toList());
            return remarkRepository.findByDate(date).stream()
                    .filter(r -> childIds.contains(r.getChild().getId()))
                    .collect(Collectors.toList());
        }
        // Educator: all remarks
        return remarkRepository.findByDate(date);
    }

    @PostMapping
    @PreAuthorize("hasRole('EDUCATEUR')")
    public Remark saveRemark(@RequestBody Remark remark) {
        return remarkRepository.save(remark);
    }
}
