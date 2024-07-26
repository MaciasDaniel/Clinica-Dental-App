package com.clinicadental.services;

import com.clinicadental.entities.Dates;
import com.clinicadental.entities.User;
import com.clinicadental.repositories.DatesRepository;
import com.clinicadental.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DatesService {

    private final DatesRepository datesRepository;

    @Autowired
    public DatesService(DatesRepository datesRepository) {
        this.datesRepository = datesRepository;
    }

    @Autowired
    private UserRepository userRepository;

    public void saveUserDate(Long userId, Dates date) {
        User user = userRepository.findById(userId)
                                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        Dates newDate = new Dates();
        newDate.setDate(date.getDate());
        newDate.setDescription(date.getDescription());
        newDate.setDentist(date.getDentist());
        newDate.setUser(user);
        datesRepository.save(newDate);
    }

    public List<Dates> getAllDatesByUser(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("El id del usuario no puede ser nulo");
        }
        
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return datesRepository.findDatesByUserId(userId);
        }
        return Collections.emptyList();
    }

    public Optional<Dates> getDateById(Long id) {
        return datesRepository.findById(id);
    }

    public void deleteDateById(Long id) {
        datesRepository.deleteById(id);
    }
}