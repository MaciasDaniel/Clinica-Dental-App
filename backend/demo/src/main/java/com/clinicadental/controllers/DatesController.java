package com.clinicadental.controllers;

import com.clinicadental.entities.Dates;
import com.clinicadental.services.DatesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/dates")
public class DatesController {

    private final DatesService datesService;

    @Autowired
    public DatesController(DatesService datesService) {
        this.datesService = datesService;
    }

    @PostMapping("/save/{userId}")
    public ResponseEntity<Dates> save(@PathVariable("userId") Long userId, @Valid @RequestBody Dates date) {
        datesService.saveUserDate(date, userId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Dates>> getAllDatesByUser(@PathVariable("userId") Long userId) {
        List<Dates> dates = datesService.getAllDatesByUser(userId);
        if (dates.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(dates, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateDateByUser(@PathVariable("id") Long id, @RequestBody Dates date) {
        Dates dateUpdated = datesService.getDateById(id).orElseThrow(() -> new RuntimeException(("No se encontró la cita.")));
        dateUpdated.setDate(date.getDate());
        dateUpdated.setDescription(date.getDescription());
        dateUpdated.setDentist(date.getDentist());
        dateUpdated.setUserId(date.getUserId());
        dateUpdated.setUser(date.getUser());

        datesService.saveUserDate(dateUpdated, id);

        return new ResponseEntity<>("Se actualizó la cita.", HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteDate(@PathVariable("id") Long id) {
        datesService.deleteDateById(id);
        return new ResponseEntity<>("Se eliminó la cita correctamente.", HttpStatus.OK);
    }

    /*@GetMapping("/user/{dentist}")
    public ResponseEntity<Optional<Dates>> findDateByDentist(@PathVariable("dentist") String dentist) {
        Optional<Dates> dateByDentist = datesService.findByDentist(dentist);
        return new ResponseEntity<>(dateByDentist, HttpStatus.OK);
    }
    Esto va en DentistController en un futuro.
    */
}
