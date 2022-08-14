package com.example.hostelmanage.controller;

import com.example.hostelmanage.model.BookingStatus;
import com.example.hostelmanage.repository.BookingStatusRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

@RestController
@RequestMapping(path="/bookingstatus")
public class BookingStatusController {
    @Inject
    public BookingStatusRepository bookingStatusRepository;

    @PostMapping("/create")
    public ResponseEntity<BookingStatus> createBookingStatus(@RequestBody BookingStatus bookingStatus){
        bookingStatus =  bookingStatusRepository.save(bookingStatus);
        return new ResponseEntity<>(bookingStatus, HttpStatus.CREATED);
    }
}
