package com.creche.controller;

import com.creche.dto.ChildDTO;
import com.creche.model.User;
import com.creche.service.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/children")
public class ChildController {
    @Autowired
    private ChildService childService;

    @Autowired
    private com.creche.repository.UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ChildDTO> createChild(@Valid @RequestBody ChildDTO dto,
            @AuthenticationPrincipal org.springframework.security.core.userdetails.User principal) {
        // Find the parent user by email (from JWT/session)
        String email = principal.getUsername();
        ChildDTO created = childService.createChildForParent(dto, email);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ChildDTO>> getChildrenByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(childService.getChildrenByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChildDTO> getChild(@PathVariable Long id) {
        return childService.getChild(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChildDTO> updateChild(@PathVariable Long id, @Valid @RequestBody ChildDTO dto) {
        return ResponseEntity.ok(childService.updateChild(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChild(@PathVariable Long id) {
        childService.deleteChild(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ChildDTO> approveChild(@PathVariable Long id) {
        return ResponseEntity.ok(childService.approveChild(id));
    }

    @PostMapping("/{id}/refuse")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ChildDTO> refuseChild(@PathVariable Long id) {
        return ResponseEntity.ok(childService.refuseChild(id));
    }

    // For staff (educateur, cuisinier, admin)
    @GetMapping
    @PreAuthorize("hasAnyRole('EDUCATEUR','CUISINIER','ADMIN')")
    public ResponseEntity<List<ChildDTO>> getAllChildrenByStatut(
            @RequestParam(required = false) String statut) {
        if (statut != null) {
            return ResponseEntity.ok(childService.getAllChildrenByStatut(statut));
        } else {
            return ResponseEntity.ok(childService.getAllAcceptedChildren());
        }
    }

    @GetMapping("/mine")
    @PreAuthorize("hasRole('PARENT')")
    public ResponseEntity<List<ChildDTO>> getMyChildren(
            @RequestParam(required = false) String statut,
            @AuthenticationPrincipal org.springframework.security.core.userdetails.User principal) {
        String email = principal.getUsername();
        User parent = userRepository.findByEmail(email);
        if (statut != null) {
            return ResponseEntity.ok(childService.getChildrenByUserAndStatut(parent.getId(), statut));
        } else {
            return ResponseEntity.ok(childService.getChildrenByUserAllStatuts(parent.getId()));
        }
    }

    // GET /children/all
    @PreAuthorize("hasAnyRole('EDUCATEUR','CUISINIER','ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<ChildDTO>> getAllChildren() {
        return ResponseEntity.ok(childService.getAllChildren());
    }

    // GET /children/mine/all
    @PreAuthorize("hasRole('PARENT')")
    @GetMapping("/mine/all")
    public ResponseEntity<List<ChildDTO>> getMyChildrenAll(
            @AuthenticationPrincipal org.springframework.security.core.userdetails.User principal) {
        String email = principal.getUsername();
        User parent = userRepository.findByEmail(email);
        return ResponseEntity.ok(childService.getChildrenByUserAllStatuts(parent.getId()));
    }

    @GetMapping("/user/{userId}/all")
    @PreAuthorize("hasAnyRole('ADMIN','EDUCATEUR','CUISINIER')")
    public ResponseEntity<List<ChildDTO>> getAllChildrenByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(childService.getChildrenByUserAllStatuts(userId));
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ChildDTO>> getPendingChildren() {
        return ResponseEntity.ok(childService.getAllChildrenByStatut("EN_ATTENTE"));
    }

    // GET /children/educateur/mine
    @PreAuthorize("hasRole('EDUCATEUR')")
    @GetMapping("/educateur/mine")
    public ResponseEntity<List<ChildDTO>> getMyAssignedChildren() {
        // No need to filter by educateur id if there is only one
        List<ChildDTO> children = childService.getAllChildrenByStatut("ACCEPTE");
        return ResponseEntity.ok(children);
    }
}