package com.creche.repository;

import com.creche.model.Presence;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface PresenceRepository extends JpaRepository<Presence, Long> {
    List<Presence> findByDate(LocalDate date);

    List<Presence> findByChildIdAndDate(Long childId, LocalDate date);
}
