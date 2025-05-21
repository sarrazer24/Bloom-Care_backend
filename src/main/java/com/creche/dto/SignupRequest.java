package com.creche.dto;

import lombok.Data;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class SignupRequest {
    @NotBlank
    private String nom;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 6)
    private String motDePasse;

    @NotBlank
    private String role;

    @NotBlank
    @Size(min = 10, max = 20)
    private String telephone;
}