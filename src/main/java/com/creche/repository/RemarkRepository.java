package com.creche.repository;

import com.creche.model.Remark;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface RemarkRepository extends JpaRepository<Remark, Long> {
    List<Remark> findByDate(LocalDate date);

    List<Remark> findByChildIdAndDate(Long childId, LocalDate date);
}
