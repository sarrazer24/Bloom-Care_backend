package com.creche.model;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
public class Presence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "child_id", nullable = false)
    private Child child;

    private LocalDate date;

    private Boolean present;

    private LocalTime arrivalTime;
    private LocalTime departureTime;

    private String reason; // e.g. "Malade", "Absent", etc.
}