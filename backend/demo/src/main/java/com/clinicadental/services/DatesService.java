package com.clinicadental.services;

import com.clinicadental.entities.Dates;
import com.clinicadental.entities.User;
import com.clinicadental.repositories.DatesRepository;
import com.clinicadental.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class DatesService {

    private final DatesRepository datesRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    public DatesService(DatesRepository datesRepository) {
        this.datesRepository = datesRepository;
    }

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

    public Dates updateUserDate(Long userId, Long dateId, Dates updatedDate) {
        User user = userRepository.findById(userId)
                                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Dates dateToUpdate = user.getDates().stream()
                                            .filter(date -> date.getId().equals(dateId))
                                            .findFirst()
                                            .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        dateToUpdate.setDate(updatedDate.getDate());
        dateToUpdate.setDescription(updatedDate.getDescription());
        dateToUpdate.setDentist(updatedDate.getDentist());

        return datesRepository.save(dateToUpdate);
    }

    public Optional<Dates> getDateById(Long id) {
        return datesRepository.findById(id);
    }

    public void deleteDateById(Long id) {
        datesRepository.deleteById(id);
    }
}