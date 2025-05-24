package com.creche.model;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "presences")
@Data
public class Presence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "child_id", nullable = false)
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler", "utilisateur", "educateur", "statut",
            "dateNaissance", "allergies", "besoinsSpecifiques", "conditionsMedicales", "additionalNotes" })
    private Child child;

    private LocalDate date;

    private Boolean present;

    private LocalTime arrivalTime;
    private LocalTime departureTime;

    private String reason; // e.g. "Malade", "Absent", etc.
}