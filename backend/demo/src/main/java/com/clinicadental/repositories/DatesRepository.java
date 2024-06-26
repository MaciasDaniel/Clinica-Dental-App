package com.clinicadental.repositories;

import com.clinicadental.entities.Dates;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DatesRepository extends JpaRepository<Dates, Long> {

    List<Dates> findDatesByUserId(Long userId);

    //Optional<Dates> findByDentist(String dentist); Esto va en Dentist en un futuro.
}
