package com.example.hostelmanage.controller;

import com.example.hostelmanage.model.RoomStatus;
import com.example.hostelmanage.repository.RoomStatusRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Optional;

@RestController
@RequestMapping("/roomstatus")
public class RoomStatusController {

        @Inject
        public RoomStatusRepository roomStatusRepository;

        @PostMapping("/create")
        public ResponseEntity<RoomStatus> createRoomStatus(@RequestBody RoomStatus roomStatus){
            roomStatus =  roomStatusRepository.save(roomStatus);
            return new ResponseEntity<>(roomStatus, HttpStatus.CREATED);
        }

        @GetMapping("/all")
        public ResponseEntity<Iterable<RoomStatus>> getAllRoomStatus(){
            Iterable<RoomStatus> list = roomStatusRepository.findAll();
            return new ResponseEntity<>(list, HttpStatus.OK);
        }

        @DeleteMapping("/delete/{id}")
        public ResponseEntity<?> deleteRoomStatusById(@PathVariable Long id){
            roomStatusRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }

        @PutMapping("/update/{id}")
        public ResponseEntity<?> updateRoomStatusById(@PathVariable Long id, @RequestBody RoomStatus roomStatus) throws Exception {
            Optional<RoomStatus> status = roomStatusRepository.findById(id);

            if(!status.isPresent()){
                throw new Exception("Room category not found");
            }

            RoomStatus thisCategory = status.get();

            if(roomStatus.getName() != null)
                thisCategory.setName(roomStatus.getName());


            thisCategory.setStatus(roomStatus.isStatus());
            thisCategory= roomStatusRepository.save(thisCategory); // save into db
            return new ResponseEntity<>(thisCategory, HttpStatus.OK);
        }
    }


