package com.creche.model;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String telephone;

    @Column(name = "mot_de_passe", nullable = false)
    private String motDePasse;

    @Column(nullable = false)
    private String role;

    @Column(name = "date_creation", nullable = false, updatable = false, insertable = false)
    private LocalDateTime dateCreation;

    @OneToMany(mappedBy = "utilisateur", fetch = FetchType.LAZY)
    private List<Child> children;
}