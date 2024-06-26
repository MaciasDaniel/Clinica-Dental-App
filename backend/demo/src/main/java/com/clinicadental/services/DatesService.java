package com.clinicadental.services;

import com.clinicadental.entities.Dates;
import com.clinicadental.entities.User;
import com.clinicadental.repositories.DatesRepository;
import com.clinicadental.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public void saveUserDate(Dates date, Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            datesRepository.save(date);
        }
    }

    public List<Dates> getAllDatesByUser(Long userId) {
        return datesRepository.findDatesByUserId(userId);
    }

    public Optional<Dates> getDateById(Long id) {
        return datesRepository.findById(id);
    }

    public void deleteDateById(Long id) {
        datesRepository.deleteById(id);
    }

    /*public Optional<Dates> findByDentist(String dentist) {
        return datesRepository.findByDentist(dentist);
    }
    Esto va en DentistService en un futuro
    */
}
