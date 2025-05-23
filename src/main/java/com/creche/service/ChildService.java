package com.creche.service;

import com.creche.model.Child;
import com.creche.model.User;
import com.creche.repository.ChildRepository;
import com.creche.repository.UserRepository;
import com.creche.dto.ChildDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChildService {
    @Autowired
    private ChildRepository childRepository;

    @Autowired
    private UserRepository userRepository;

    // Only used internally, always set user from authenticated parent
    private ChildDTO createChild(ChildDTO dto, User user) {
        Child child = toEntity(dto);
        child.setUtilisateur(user);
        child.setStatut("EN_ATTENTE");
        return toDTO(childRepository.save(child));
    }

    public ChildDTO createChildForParent(ChildDTO dto, String parentEmail) {
        User parent = userRepository.findByEmail(parentEmail);
        if (parent == null) {
            throw new RuntimeException("Parent not found");
        }
        return createChild(dto, parent);
    }

    public List<ChildDTO> getChildrenByUser(Long utilisateurId) {
        return childRepository.findByUtilisateurIdAndStatut(utilisateurId, "ACCEPTE")
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    // For staff: get all accepted children
    public List<ChildDTO> getAllAcceptedChildren() {
        return childRepository.findByStatut("ACCEPTE")
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public Optional<ChildDTO> getChild(Long id) {
        return childRepository.findById(id).map(this::toDTO);
    }

    public ChildDTO updateChild(Long id, ChildDTO dto) {
        Child child = childRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enfant non trouvé"));
        child.setNom(dto.getNom());
        child.setPrenom(dto.getPrenom());
        child.setDateNaissance(dto.getDateNaissance());
        child.setGenre(dto.getGenre());
        child.setAllergies(dto.getAllergies());
        child.setBesoinsSpecifiques(dto.getBesoinsSpecifiques());
        child.setConditionsMedicales(dto.getConditionsMedicales());
        return toDTO(childRepository.save(child));
    }

    public ChildDTO approveChild(Long id) {
        Child child = childRepository.findById(id).orElseThrow();
        child.setStatut("ACCEPTE");
        childRepository.save(child);
        return toDTO(child);
    }

    public ChildDTO refuseChild(Long id) {
        Child child = childRepository.findById(id).orElseThrow();
        child.setStatut("REFUSE");
        childRepository.save(child);
        return toDTO(child);
    }

    public void deleteChild(Long id) {
        childRepository.deleteById(id);
    }

    public List<ChildDTO> getAllChildren() {
        return childRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ChildDTO> getAllChildrenByStatut(String statut) {
        return childRepository.findByStatut(statut).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ChildDTO> getChildrenByUserAllStatuts(Long utilisateurId) {
        return childRepository.findByUtilisateurId(utilisateurId).stream().map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ChildDTO> getChildrenByUserAndStatut(Long utilisateurId, String statut) {
        return childRepository.findByUtilisateurIdAndStatut(utilisateurId, statut).stream().map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ChildDTO> getChildrenByEducateurAndStatut(Long educateurId, String statut) {
        return childRepository.findByEducateurId(educateurId).stream()
                .filter(child -> statut.equals(child.getStatut()))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private ChildDTO toDTO(Child child) {
        ChildDTO dto = new ChildDTO();
        dto.setId(child.getId());
        dto.setNom(child.getNom());
        dto.setPrenom(child.getPrenom());
        dto.setDateNaissance(child.getDateNaissance());
        dto.setGenre(child.getGenre());
        dto.setAllergies(child.getAllergies());
        dto.setBesoinsSpecifiques(child.getBesoinsSpecifiques());
        dto.setConditionsMedicales(child.getConditionsMedicales());
        dto.setUtilisateurId(child.getUtilisateur().getId());
        dto.setAdditionalNotes(child.getAdditionalNotes());
        dto.setStatut(child.getStatut());
        return dto;
    }

    private Child toEntity(ChildDTO dto) {
        Child child = new Child();
        child.setNom(dto.getNom());
        child.setPrenom(dto.getPrenom());
        child.setDateNaissance(dto.getDateNaissance());
        child.setGenre(dto.getGenre());
        child.setAllergies(dto.getAllergies());
        child.setBesoinsSpecifiques(dto.getBesoinsSpecifiques());
        child.setConditionsMedicales(dto.getConditionsMedicales());
        child.setAdditionalNotes(dto.getAdditionalNotes());
        child.setStatut(dto.getStatut() != null ? dto.getStatut() : "EN_ATTENTE");
        return child;
    }
}