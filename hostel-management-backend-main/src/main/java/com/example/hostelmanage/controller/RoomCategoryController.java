package com.example.hostelmanage.controller;

import com.example.hostelmanage.model.RoomCategory;
import com.example.hostelmanage.repository.RoomCategoryRepository;
import com.example.hostelmanage.util.Slug;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/roomcategory")
public class RoomCategoryController {

    @Inject
    public RoomCategoryRepository roomCategoryRepository;

    /* Check available room number by category id*/
    @GetMapping("/check/roomCategory/{cate_id}/time/{checkInTime}/to/{checkOutTime}/p/{people}")
    public ResponseEntity<?> checkAvailableRoomNumberByCateId(@PathVariable Long cate_id, @PathVariable String checkInTime, @PathVariable String checkOutTime, @PathVariable int people){
        List<Map<String, Object>> list = roomCategoryRepository.checkAvailableRoomNumberByCateId(cate_id, checkInTime, checkOutTime, people);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<RoomCategory> createRoomCate(@RequestBody RoomCategory roomCategory){
        roomCategory.setSlug(Slug.makeSlug(roomCategory.getName()));
        roomCategory =  roomCategoryRepository.save(roomCategory);
        return new ResponseEntity<>(roomCategory, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<RoomCategory>> getAllRoomCate(){
        Iterable<RoomCategory> list = roomCategoryRepository.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteRoomCateById(@PathVariable Long id) throws Exception {
        Optional<RoomCategory> category = roomCategoryRepository.findById(id);

        if(!category.isPresent()){
            throw new Exception("Room category is not found");
        }
        RoomCategory thisCategory = category.get();
        thisCategory.setStatus(false);
        thisCategory = roomCategoryRepository.save(thisCategory);
        return new ResponseEntity<>(thisCategory, HttpStatus.OK);
    }

    @PutMapping("/undelete/{id}")
    public ResponseEntity<?> unDeleteRoomCateById(@PathVariable Long id) throws Exception {
        Optional<RoomCategory> category = roomCategoryRepository.findById(id);

        if(!category.isPresent()){
            throw new Exception("Room category is not found");
        }
        RoomCategory thisCategory = category.get();
        thisCategory.setStatus(true);
        thisCategory = roomCategoryRepository.save(thisCategory);
        return new ResponseEntity<>(thisCategory, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateRoomCateById(@PathVariable Long id, @RequestBody RoomCategory roomCategory) throws Exception {
        Optional<RoomCategory> category = roomCategoryRepository.findById(id);

        if(!category.isPresent()){
            throw new Exception("Room category not found");
        }

        RoomCategory thisCategory = category.get();

        if(!roomCategory.getName().equals(""))
            thisCategory.setName(roomCategory.getName());
        if(!roomCategory.getDescription().equals(""))
            thisCategory.setDescription(roomCategory.getDescription());
        if(roomCategory.getPeople() != 0)
            thisCategory.setPeople(roomCategory.getPeople());
        if(roomCategory.getPrice() != 0)
            thisCategory.setPrice(roomCategory.getPrice());
        if(roomCategory.getBed() != 0)
            thisCategory.setBed(roomCategory.getBed());
        if(roomCategory.getBath() != 0)
            thisCategory.setBath(roomCategory.getBath());

        thisCategory.setStatus(roomCategory.isStatus());
        thisCategory= roomCategoryRepository.save(thisCategory); // save into db
        return new ResponseEntity<>(thisCategory, HttpStatus.OK);
    }

    @GetMapping("/detail/{slug}")
    public ResponseEntity<?> findRoomCateBySlug(@PathVariable String slug) throws Exception {
        System.out.println(slug);
        Optional<RoomCategory> category = roomCategoryRepository.findRoomCategoryBySlug(slug);

        if(!category.isPresent()){
            throw new Exception("Room category not found");
        }
        return new ResponseEntity<>(category.get(), HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public  ResponseEntity<?> findRoomCateById(@PathVariable Long id) throws Exception {
        Optional<RoomCategory> roomCategory = roomCategoryRepository.findById(id);

        if(!roomCategory.isPresent()){
            throw new Exception("Roome Category is not found");
        }

        return new ResponseEntity<>(roomCategory.get(), HttpStatus.OK);

    }

}

