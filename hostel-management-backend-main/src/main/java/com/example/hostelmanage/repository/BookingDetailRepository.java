package com.example.hostelmanage.repository;

import com.example.hostelmanage.model.BookingDetail;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookingDetailRepository extends CrudRepository<BookingDetail, Long>{

    @Query(value = "SELECT * FROM booking_detail WHERE fk_booking = ?1", nativeQuery = true)
    Optional<BookingDetail> findBookingDetailByBookingId(Long booking_id);
}
