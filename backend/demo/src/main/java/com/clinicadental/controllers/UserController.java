package com.clinicadental.controllers;

import com.clinicadental.entities.User;
import com.clinicadental.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("permitAll")
    @GetMapping("/users/{page}")
    public ResponseEntity<Page<User>> listUsers(@PathVariable("page") Integer page) {
        Page<User> list = userService.getAllUsers(PageRequest.of(page, 8));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/dates/user/{id}")
    public ResponseEntity<?> getDatesByUser(@PathVariable("id") Long id) {
        Optional<User> user = userService.getAllDatesByUser(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get().getDates());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("permitAll")
    @GetMapping("/user/{id}")
    public ResponseEntity<Optional<User>> getById(@PathVariable("id") Long id) {
        Optional<User> user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PreAuthorize("permitAll")
    @PostMapping("/user/save")
    public ResponseEntity<User> saveUser(@Valid @RequestBody User user) {
        User userSaved = userService.saveUser(user);
        return new ResponseEntity<>(userSaved, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @Valid @RequestBody User user) {
        User userUpdated = userService.getUserById(id).orElseThrow(() -> new RuntimeException("El usuario con id: "+ id +" no existe."));
        userUpdated.setName(user.getName());
        userUpdated.setLastName(user.getLastName());
        userUpdated.setUsername(user.getUsername());
        userUpdated.setEmail(user.getEmail());
        userUpdated.setPassword(user.getPassword());
        userUpdated.setRole(user.getRole());
        userUpdated.setDates(user.getDates());

        User userSaved = userService.saveUser(userUpdated);

        return new ResponseEntity<>(userSaved, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('WRITE')")
    @DeleteMapping("/delete/user/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<String>("Usuario eliminado correctamente.", HttpStatus.OK);
    }
}