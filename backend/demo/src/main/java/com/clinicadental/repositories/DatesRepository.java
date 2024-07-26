package com.clinicadental.repositories;

import com.clinicadental.entities.Dates;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatesRepository extends JpaRepository<Dates, Long> {
    List<Dates> findDatesByUserId(Long userId);
}