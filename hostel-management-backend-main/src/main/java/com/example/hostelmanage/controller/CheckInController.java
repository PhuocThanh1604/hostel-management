package com.example.hostelmanage.controller;

import com.example.hostelmanage.domain.BookingDomain;
import com.example.hostelmanage.model.*;
import com.example.hostelmanage.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "/checkin")
public class CheckInController {

    @Inject
    public BookingRepository bookingRepository;

    @Inject
    public BookingStatusRepository bookingStatusRepository;

    @Inject
    public RoomRepository roomRepository;

    @Inject
    public BookingDetailRepository bookingDetailRepository;

    @Inject
    public RoomStatusRepository roomStatusRepository;

    @GetMapping("/search/all/{today}")
    public ResponseEntity<?> searchtoCheckIn(@PathVariable String today){
//        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
//        Optional<Account> account = accountRepository.findAccountByEmail(email);
//        Account thisAccount = account.get();

        List<Map<String, Object>> list =  bookingRepository.searchtoCheckIn(today);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PutMapping("/booking/{booking_id}/room/{room_id}")
    public ResponseEntity<?> checkIn(@PathVariable Long booking_id, @PathVariable Long room_id, @RequestBody BookingDomain bookingDomain){
        Optional<Booking> booking =  bookingRepository.findById(booking_id);
        Optional<BookingStatus> bookingStatus = bookingStatusRepository.findById(Long.valueOf(4)); // 4 is staying
        Booking thisBooking = booking.get();
        BookingStatus thisBookingStatus = bookingStatus.get();
        thisBooking.setPrepayment(thisBooking.getPrepayment() + bookingDomain.getPrepayment());
        thisBooking.setSurcharge(bookingDomain.getSurcharge());
        thisBooking.setBookingStatus(thisBookingStatus);



        Optional<Room> room = roomRepository.findById(room_id);
        Optional<RoomStatus> roomStatus = roomStatusRepository.findById(Long.valueOf(2)); // room status 2 = Unvailable
        Room thisRoom = room.get();
        RoomStatus thisRoomStatus = roomStatus.get();
        thisRoom.setRoomStatus(thisRoomStatus);


        Optional<BookingDetail> bookingDetail = bookingDetailRepository.findBookingDetailByBookingId(thisBooking.getId());
        BookingDetail thisBookingDetail = bookingDetail.get();
        thisBookingDetail.setRoom(thisRoom);
        thisBookingDetail.setTotalRoom(bookingDomain.getTotal_room());

        bookingRepository.save(thisBooking);
        roomRepository.save(thisRoom);
        bookingDetailRepository.save(thisBookingDetail);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/detail/room/{room_id}")
    public ResponseEntity<?> showDetailByRoomId(@PathVariable Long room_id){
//        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
//        Optional<Account> account = accountRepository.findAccountByEmail(email);
//        Account thisAccount = account.get();

        Map<String, Object> detail =  bookingRepository.showDetail(room_id);
        return new ResponseEntity<>(detail, HttpStatus.OK);
    }

    @PutMapping("/change/{booking_id}/room/{room_id}")
    public ResponseEntity<?> changeRoom(@PathVariable Long room_id, @PathVariable Long booking_id){
//        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
//        Optional<Account> account = accountRepository.findAccountByEmail(email);
//        Account thisAccount = account.get();

        /*
        * 1. Set old room to available
        * 2. Set new room for booking detail
        * 3. New room has unavailable status
        * */
        Optional<RoomStatus> available = roomStatusRepository.findById(Long.valueOf(1));
        Optional<RoomStatus> unavailable = roomStatusRepository.findById(Long.valueOf(2));

        Optional<BookingDetail> bookingDetail = bookingDetailRepository.findBookingDetailByBookingId(booking_id);
        BookingDetail thisBookingDetail = bookingDetail.get();
        Room oldRoom = thisBookingDetail.getRoom();
        oldRoom.setRoomStatus(available.get());
        thisBookingDetail = bookingDetailRepository.save(thisBookingDetail);

        Optional<Room> room = roomRepository.findById(room_id);
        Room thisRoom = room.get();
        thisBookingDetail.setRoom(thisRoom);
        thisRoom.setRoomStatus(unavailable.get());

        bookingDetailRepository.save(thisBookingDetail);
        roomRepository.save(thisRoom);

        return new ResponseEntity<>(HttpStatus.OK);
    }




}
