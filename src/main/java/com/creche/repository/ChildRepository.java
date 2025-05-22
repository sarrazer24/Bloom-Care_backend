package com.creche.repository;

import com.creche.model.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChildRepository extends JpaRepository<Child, Long> {
    List<Child> findByUtilisateurId(Long utilisateurId);
}
