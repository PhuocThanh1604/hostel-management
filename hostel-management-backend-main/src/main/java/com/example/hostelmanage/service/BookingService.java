package com.example.hostelmanage.service;

import com.example.hostelmanage.repository.BookingDetailRepository;
import com.example.hostelmanage.repository.BookingRepository;
import com.example.hostelmanage.repository.RoomRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

@Service
public class BookingService {

    @Inject
    private BookingRepository bookingRepository;

    @Inject
    private BookingDetailRepository bookingDetailRepository;

    @Inject
    private RoomRepository roomRepository;


}
