package com.creche.model;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class Remark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "child_id", nullable = false)
    private Child child;

    private LocalDate date;

    private String category; // e.g. "Santé", "Social", "Général"
    private String remark;
}
