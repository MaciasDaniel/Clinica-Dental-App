package com.clinicadental.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;

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
    private LocalDateTime date;

    @NotNull
    private String description;

    @NotNull
    private String dentist;

    private Long userId;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "foreign_key")
    private User user;
}
