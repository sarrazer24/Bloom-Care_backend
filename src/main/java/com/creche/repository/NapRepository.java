package com.creche.repository;

import com.creche.model.Nap;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface NapRepository extends JpaRepository<Nap, Long> {
    List<Nap> findByDate(LocalDate date);

    List<Nap> findByChildIdAndDate(Long childId, LocalDate date);
}
