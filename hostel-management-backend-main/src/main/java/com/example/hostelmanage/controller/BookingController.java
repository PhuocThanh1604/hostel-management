package com.example.hostelmanage.controller;


import com.example.hostelmanage.domain.BookingDomain;
import com.example.hostelmanage.model.*;
import com.example.hostelmanage.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path="/booking")
public class BookingController {

    @Inject
    public BookingRepository bookingRepository;

    @Inject
    public AccountRepository  accountRepository;

    @Inject
    public RoomCategoryRepository roomCategoryRepository;

    @Inject
    public BookingStatusRepository bookingStatusRepository;

    @Inject
    public BookingDetailRepository bookingDetailRepository;

    @Inject
    private PasswordEncoder passwordEncoder;

    @Inject
    private  ProfileRepository profileRepository;

    @Inject
    private RoleRepository roleRepository;

    @GetMapping("/search/{checkInTime}/to/{checkOutTime}/p/{people}")
    public ResponseEntity<?> bookingWithTimeAndQtt(@PathVariable String checkInTime, @PathVariable String checkOutTime, @PathVariable int people){
        List<Map<String, Object>> list = roomCategoryRepository.bookingWithTimeAndQtt(checkInTime, checkOutTime, people);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/user/create/roomCategory/{cate_id}")
    @PreAuthorize("hasRole('user')")
    public ResponseEntity<?> createABookingforUser(@PathVariable Long cate_id, @RequestBody BookingDomain bookingDomain) throws Exception {


        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Account> account = accountRepository.findAccountByEmail(email);
        Account thisAccount = account.get();

        /* 1. Create a booking */
        Booking booking = new Booking();
        booking.setAccount(thisAccount);
        booking.setNote(bookingDomain.getNote());
        booking.setSurcharge(bookingDomain.getSurcharge());
        booking.setPrepayment(bookingDomain.getPrepayment());
        booking.setPeople(bookingDomain.getPeople());
        booking.setBookingTime(bookingDomain.getBookingTime());
        Optional<BookingStatus> bookingStatus = bookingStatusRepository.findById(Long.valueOf(1)); // 1 = Waiting
        booking.setBookingStatus(bookingStatus.get());
        booking = bookingRepository.save(booking);

        /* 2. Create a booking detail */
        BookingDetail bookingDetail = new BookingDetail();
        bookingDetail.setBooking(booking);
        bookingDetail.setCheckInTime(bookingDomain.getCheckInTime());
        bookingDetail.setCheckOutTime(bookingDomain.getCheckOutTime());
        bookingDetail.setTotalRoom(bookingDomain.getTotal_room());
        Optional<RoomCategory> roomCategory = roomCategoryRepository.findById(cate_id);
        bookingDetail.setRoomCategory(roomCategory.get());
        bookingDetail.setStatus(true);
        bookingDetail = bookingDetailRepository.save(bookingDetail);

        return new ResponseEntity<>(bookingDetail, HttpStatus.CREATED);
    }

    @PostMapping("/admin/create/roomCategory/{cate_id}")
    public ResponseEntity<?> createABookingforAdmin(@PathVariable Long cate_id, @RequestBody BookingDomain bookingDomain) throws Exception {


        /* 1. Create a booking */
        Booking booking = new Booking();
        booking.setPrepayment(bookingDomain.getPrepayment());
        booking.setPeople(bookingDomain.getPeople());
        booking.setBookingTime(bookingDomain.getBookingTime());

        Optional<Account> accountChecking = accountRepository.findAccountByEmail(bookingDomain.getEmail());
        Account unknownUserAccount = new Account();
        Profile unknownUserProfile = new Profile();

        Optional<Role> role = roleRepository.findById(Long.valueOf(1));
        Role thisRole = role.get();



        if(accountChecking.isPresent()) {
            booking.setAccount(accountChecking.get());
        } else {
            unknownUserAccount.setEmail(bookingDomain.getEmail());
            unknownUserAccount.setPhone(bookingDomain.getPhone());
            unknownUserAccount.setPassword(passwordEncoder.encode("test"));
            unknownUserProfile.setFullName(bookingDomain.getFullName());
            unknownUserProfile.setCardNumber(bookingDomain.getCardNumber());
            //unknownUserAccount.setRole(thisRole);
            unknownUserAccount.setProfile(unknownUserProfile);

            unknownUserProfile = profileRepository.save(unknownUserProfile);
            unknownUserAccount.setProfile(unknownUserProfile);
            unknownUserAccount = accountRepository.save(unknownUserAccount);
            unknownUserProfile.setAccount(unknownUserAccount);
            unknownUserProfile = profileRepository.save(unknownUserProfile);

            booking.setAccount(unknownUserAccount);

        }

        Optional<BookingStatus> bookingStatus = bookingStatusRepository.findById(Long.valueOf(1)); // 1 = Waiting
        booking.setBookingStatus(bookingStatus.get());
        booking = bookingRepository.save(booking);

        /* 2. Create a booking detail */
        BookingDetail bookingDetail = new BookingDetail();
        bookingDetail.setBooking(booking);
        bookingDetail.setCheckInTime(bookingDomain.getCheckInTime());
        bookingDetail.setCheckOutTime(bookingDomain.getCheckOutTime());

        Optional<RoomCategory> roomCategory = roomCategoryRepository.findById(cate_id);
        bookingDetail.setRoomCategory(roomCategory.get());
        bookingDetail.setTotalRoom(bookingDomain.getTotal_room());
        bookingDetail.setStatus(true);
        bookingDetail = bookingDetailRepository.save(bookingDetail);

        return new ResponseEntity<>(bookingDetail, HttpStatus.CREATED);
    }

    /* Cancel a booking */
    @PutMapping("/cancel/{booking_id}")
    public ResponseEntity<?> cancelABooking(@PathVariable Long booking_id) throws Exception {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Account> account = accountRepository.findAccountByEmail(email);

        Account thisAccount = account.get();

        /* 1. Find booking */
        Optional<Booking> booking = bookingRepository.findById(booking_id);
        Booking thisBooking = booking.get();

        /* 2. Check if booking id equals account id */
        if(thisBooking.getAccount().getId() != thisAccount.getId()){
            throw new Exception("No Authentization");
        }

        /*3. Modify booking status to cancel */
        Optional<BookingStatus> bookingStatus = bookingStatusRepository.findById(Long.valueOf(3)); // 3 = cancel
        BookingStatus thisBookingStatus = bookingStatus.get();
        thisBooking.setBookingStatus(thisBookingStatus);

        bookingRepository.save(thisBooking);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /* Undo a booking */
    @PutMapping("/undo/{booking_id}")
    public ResponseEntity<?> undoABoooking(@PathVariable Long booking_id) throws Exception {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Account> account = accountRepository.findAccountByEmail(email);

        Account thisAccount = account.get();

        /* 1. Find booking */
        Optional<Booking> booking = bookingRepository.findById(booking_id);
        Booking thisBooking = booking.get();

        /* 2. Check if booking id equals account id */
        if(thisBooking.getAccount().getId() != thisAccount.getId()){
            throw new Exception("No Authentization");
        }

        /* 3. Set Booking status to waiting and Save Booking */
        Optional<BookingStatus> bookingStatus = bookingStatusRepository.findById(Long.valueOf(1)); // 1 = Waiting
        BookingStatus thisBookingStatus = bookingStatus.get();

        thisBooking.setBookingStatus(thisBookingStatus);
        thisBooking = bookingRepository.save(thisBooking);

        return new ResponseEntity<>(thisBooking, HttpStatus.OK);
    }

    /* Get booking by status for user
    * To pay = 1
    * Cancel = 3
    * Staying = 4
    * Complete = 2
    *  */
    @GetMapping("/status/{status_id}")
    @PreAuthorize("hasRole('user') or hasRole('admin')")
    public ResponseEntity<?> getBookingDetailByStatus(@PathVariable Long status_id){
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Account> account = accountRepository.findAccountByEmail(email);
        Account thisAccount = account.get();

        List<Map<String, Object>> bookingList =  bookingRepository.findBookingDetailByStatus(thisAccount.getId(), status_id);
        return new ResponseEntity<>(bookingList, HttpStatus.OK);
    }


    @GetMapping("/all")
    public ResponseEntity<Iterable<Booking>> getAllBooking(){
        Iterable<Booking> list = bookingRepository.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /*Get bookings are waiting for admin */
    @GetMapping("/admin/all")
    public ResponseEntity<?> showBookingListForAdmin(){

        List<Map<String, Object>> list =  bookingRepository.showBookingList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /* Update account for Boooking */
    @PutMapping("/update/{id}/account/{account_id}")
    public ResponseEntity<?> updateCateforBooking(
            @PathVariable Long id,
            @PathVariable Long account_id
    ) throws Exception {
        Optional<Booking> booking = bookingRepository.findById(id);
        if(!booking.isPresent()){
            throw new Exception("Booking not found");
        }
        Optional<Account> account = accountRepository.findById(account_id);
        if(!account .isPresent()){
            throw new Exception("account  not found");
        }

        /* Set accountID to Booking */
        Booking thisBooking = booking.get();
        thisBooking.setAccount(account.get());

        thisBooking = bookingRepository.save(thisBooking);

        return new ResponseEntity<>(thisBooking, HttpStatus.OK);

    }

    /* Update some info after booking*/
    @PutMapping("/update/id/{booking_id}")
    public ResponseEntity<?> updateCheckInInfo(@RequestBody BookingDomain bookingDomain, @PathVariable Long booking_id){
        Optional<Booking> booking = bookingRepository.findById(Long.valueOf(booking_id));
        Booking thisBooking = booking.get();
        thisBooking.setPrepayment(bookingDomain.getPrepayment());
        thisBooking.setPeople(bookingDomain.getPeople());
        thisBooking = bookingRepository.save(thisBooking);

        Optional<BookingDetail> bookingDetail = bookingDetailRepository.findBookingDetailByBookingId(thisBooking.getId());
        BookingDetail thisBookingDetail = bookingDetail.get();
        thisBookingDetail.setCheckOutTime(bookingDomain.getCheckOutTime());
        thisBookingDetail.setTotalRoom(bookingDomain.getTotal_room());
        bookingDetailRepository.save(thisBookingDetail);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
