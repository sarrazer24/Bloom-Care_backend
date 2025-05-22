package com.creche.dto;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class ChildDTO {
    private Long id;

    @NotBlank
    private String nom;

    @NotBlank
    private String prenom;

    @NotNull
    private LocalDate dateNaissance;

    private String genre;

    private String allergies;

    private String besoinsSpecifiques;

    private String conditionsMedicales;

    private String additionalNotes;

    private String statut;

    private Long utilisateurId;
}
