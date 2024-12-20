package com.clinicadental.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "citas")
public class Dates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    @Column(name = "cita", columnDefinition = "DATETIME")
    private LocalDateTime date;

    @NotNull
    @Column(name = "descripción")
    private String description;

    @NotNull
    @Column(name = "dentista")
    private String dentist;

    @ManyToOne(targetEntity = User.class)
    @JsonBackReference
    @JoinColumn(name = "usuario_id", nullable = false)
    private User user;
}