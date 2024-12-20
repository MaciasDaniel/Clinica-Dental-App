package com.clinicadental.controllers;

import com.clinicadental.entities.Dates;
import com.clinicadental.services.DatesService;

import jakarta.validation.Valid;

import java.util.Optional;

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
    @GetMapping("/appointment/{id}")
    public ResponseEntity<Optional<Dates>> getDateById(@PathVariable("id") Long id) {
        Optional<Dates> date = datesService.getDateById(id);
        return new ResponseEntity<>(date, HttpStatus.OK);
    }

    @PreAuthorize("permitAll")
    @PostMapping("/user/{id}")
    public ResponseEntity<String> createDate(@PathVariable("id") Long userId, @Valid @RequestBody Dates date) {
        datesService.saveUserDate(userId, date);
        return new ResponseEntity<>("Cita agendada.", HttpStatus.CREATED);
    }

    @PreAuthorize("permitAll")
    @PutMapping("/update/appointment/{userId}/{dateId}")
    public ResponseEntity<Dates> updateDateByUser(@PathVariable("userId") Long userId, @PathVariable("dateId") Long dateId, @Valid @RequestBody Dates date) {
        Dates updatedDate = datesService.updateUserDate(userId, dateId, date);
        return new ResponseEntity<>(updatedDate, HttpStatus.OK);
    }

    @PreAuthorize("permitAll")
    @DeleteMapping("delete/appointment/{id}")
    public ResponseEntity<String> deleteDate(@PathVariable("id") Long id) {
        datesService.deleteDateById(id);
        return new ResponseEntity<>("Se eliminó la cita correctamente.", HttpStatus.OK);
    }
}