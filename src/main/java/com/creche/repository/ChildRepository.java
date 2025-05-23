package com.creche.repository;

import com.creche.model.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChildRepository extends JpaRepository<Child, Long> {
    List<Child> findAll();

    List<Child> findByUtilisateurId(Long utilisateurId);

    List<Child> findByStatut(String statut);

    List<Child> findByUtilisateurIdAndStatut(Long utilisateurId, String statut);

    // Add this method for educateur
    List<Child> findByEducateurId(Long educateurId);
}
