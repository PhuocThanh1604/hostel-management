package com.example.hostelmanage.controller;

import com.example.hostelmanage.model.Role;
import com.example.hostelmanage.repository.BookingDetailRepository;
import com.example.hostelmanage.repository.RoleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Optional;

@RestController
@RequestMapping(path="/role")
public class RoleController {
    @Inject
    public RoleRepository roleRepository;

    @Inject
    public BookingDetailRepository bookingDetailRepository;

    @PostMapping("/create")
    public ResponseEntity<Role> createRole(@RequestBody Role role){
        role =  roleRepository.save(role);
        return new ResponseEntity<>(role, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Role>> getAllRole(){
        Iterable<Role> list = roleRepository.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRoleById(@PathVariable Long id){
        roleRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /* Update Role */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateRoleById(@PathVariable Long id, @RequestBody Role role) throws Exception {
        Optional<Role> roleID = roleRepository.findById(id);

        if(!roleID.isPresent()){
            throw new Exception("Service not found");
        }

        Role thisRole = roleID.get();

        if(role.getName() != null)
            thisRole.setName(role.getName());


        thisRole.setStatus(role.isStatus());

        thisRole = roleRepository.save(thisRole);

        return new ResponseEntity<>(thisRole, HttpStatus.OK);
    }
}
