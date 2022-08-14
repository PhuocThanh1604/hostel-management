package com.example.hostelmanage.controller;

import com.example.hostelmanage.model.Room;
import com.example.hostelmanage.model.RoomCategory;
import com.example.hostelmanage.model.RoomStatus;
import com.example.hostelmanage.repository.RoomCategoryRepository;
import com.example.hostelmanage.repository.RoomRepository;
import com.example.hostelmanage.repository.RoomStatusRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Optional;

@RestController
@RequestMapping("/room")
public class RoomController {

    @Inject
    public RoomRepository roomRepository;

    @Inject
    public RoomCategoryRepository roomCategoryRepository;

    @Inject
    public RoomStatusRepository roomStatusRepository;


    /*
     * Create a room with a category and a status
     */

    @PostMapping("/create/category/{cate_id}/status/{status_id}")
    public ResponseEntity<Room> createRoom(@RequestBody Room room, @PathVariable Long cate_id, @PathVariable Long status_id) {

        Optional<RoomCategory> roomCategory = roomCategoryRepository.findById(cate_id);
        Optional<RoomStatus> roomStatus = roomStatusRepository.findById(status_id);

        if(roomCategory.isPresent()){
            RoomCategory thisRoomCategory = roomCategory.get();
            room.setRoomCategory(thisRoomCategory);
        }
        if(roomStatus.isPresent()) {
            RoomStatus thisRoomStatus = roomStatus.get();
            room.setRoomStatus(thisRoomStatus);
        }

        room = roomRepository.save(room);
        return new ResponseEntity<>(room, HttpStatus.CREATED);
    }

    /*
    * Update category for room
    * */

    @PutMapping("/update_category/id/{room_id}/category/{cate_id}")
    public ResponseEntity<Room> updateCategoryForRoom(@PathVariable Long cate_id, @PathVariable Long room_id) {

        Optional<RoomCategory> roomCategory = roomCategoryRepository.findById(cate_id);
        Optional<Room> room = roomRepository.findById(room_id);

        RoomCategory thisRoomCategory = roomCategory.get();
        Room thisRoom = room.get();

        thisRoom.setRoomCategory(thisRoomCategory);

        thisRoom =  roomRepository.save(thisRoom);
        return new ResponseEntity<>(thisRoom, HttpStatus.CREATED);
    }

    @PutMapping("/update_name/id/{room_id}")
    public ResponseEntity<Room> updateCategoryForRoom(@RequestBody String name, @PathVariable Long room_id) {

        Optional<Room> room = roomRepository.findById(room_id);
        Room thisRoom = room.get();

        thisRoom.setName(name);

        thisRoom =  roomRepository.save(thisRoom);
        return new ResponseEntity<>(thisRoom, HttpStatus.CREATED);
    }

    /*
    * Update status for room
    * */
    @PutMapping("/update_roomstatus/id/{room_id}/status/{status_id}")
    public ResponseEntity<Room> updateRoomStatusForRoom(@PathVariable Long status_id, @PathVariable Long room_id) {

        Optional<RoomStatus> roomStatus = roomStatusRepository.findById(status_id);
        Optional<Room> room = roomRepository.findById(room_id);

        RoomStatus thisRoomStatus = roomStatus.get();
        Room thisRoom = room.get();

        thisRoom.setRoomStatus(thisRoomStatus);

        thisRoom =  roomRepository.save(thisRoom);
        return new ResponseEntity<>(thisRoom, HttpStatus.CREATED);
    }

    @PutMapping("/update_status/id/{room_id}")
    public ResponseEntity<Room> updateStatusForRoom(@RequestBody boolean status, @PathVariable Long room_id) {

        Optional<Room> room = roomRepository.findById(room_id);
        Room thisRoom = room.get();

        thisRoom.setStatus(status);

        thisRoom =  roomRepository.save(thisRoom);
        return new ResponseEntity<>(thisRoom, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Room>> getAllRoom(){
        Iterable<Room> list = roomRepository.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    @GetMapping("/search/category/{cate_id}/status/{status_id}")
    public ResponseEntity<Iterable<Room>> getRoomsByCateAndStatus(@PathVariable Long cate_id, @PathVariable Long status_id){
        Iterable<Room> list = roomRepository.findValRoomByRoomCategoryId(cate_id, status_id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRoomById(@PathVariable Long id){
        roomRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateRoomById(@PathVariable Long id, @RequestBody Room room) throws Exception {
        Optional<Room> roomID = roomRepository.findById(id);

        if(!roomID.isPresent()){
            throw new Exception("Room not found");
        }

        Room thisCategory = roomID.get();

        if(room.getName() != null)
            thisCategory.setName(room.getName());
        if(room.getPrice() != 0)
            thisCategory.setPrice(room.getPrice());
        if(room.getFinishTime() != null)
            thisCategory.setFinishTime(room.getFinishTime());

        thisCategory.setStatus(room.isStatus());
        thisCategory= roomRepository.save(thisCategory); // save into db
        return new ResponseEntity<>(thisCategory, HttpStatus.OK);
    }




}
