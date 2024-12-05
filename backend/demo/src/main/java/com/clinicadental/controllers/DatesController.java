package com.clinicadental.controllers;

import com.clinicadental.entities.Dates;
import com.clinicadental.services.DatesService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/dates")
public class DatesController {

    private final DatesService datesService;

    @Autowired
    public DatesController(DatesService datesService) {
        this.datesService = datesService;
    }

    @PreAuthorize("permitAll")
    @PostMapping("/user/{id}")
    public ResponseEntity<String> createDate(@PathVariable("id") Long userId, @Valid @RequestBody Dates date) {
        datesService.saveUserDate(userId, date);
        return new ResponseEntity<>("Cita agendada.", HttpStatus.CREATED);
    }

    @PreAuthorize("permitAll")
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateDateByUser(@PathVariable("id") Long userId, @Valid @RequestBody Dates date) {
        Dates dateUpdated = datesService.getDateById(userId).orElseThrow();
        dateUpdated.setDate(date.getDate());
        dateUpdated.setDescription(date.getDescription());
        dateUpdated.setDentist(date.getDentist());
        dateUpdated.setUser(date.getUser());
        datesService.saveUserDate(userId, dateUpdated);
        return new ResponseEntity<>("Se actualizó la cita.", HttpStatus.OK);
    }

    @PreAuthorize("permitAll")
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteDate(@PathVariable("id") Long id) {
        datesService.deleteDateById(id);
        return new ResponseEntity<>("Se eliminó la cita correctamente.", HttpStatus.OK);
    }
}