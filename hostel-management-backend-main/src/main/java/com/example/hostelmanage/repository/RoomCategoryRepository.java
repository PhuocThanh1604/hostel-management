package com.example.hostelmanage.repository;

import com.example.hostelmanage.model.RoomCategory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface RoomCategoryRepository  extends CrudRepository<RoomCategory, Long> {

    @Query(value = "select * from ROOM_CATEGORY cate where cate.SLUG like ?1", nativeQuery = true)
    Optional<RoomCategory> findRoomCategoryBySlug(String slug);

    @Query(value="CALL searchtoBooking(?1, ?2, ?3)", nativeQuery = true)
    List<Map<String, Object>> bookingWithTimeAndQtt(String chekInTime, String checkOutTime, int people);

    @Query(value="CALL ReportASingleRoom(?1, ?2, ?3, ?4)", nativeQuery = true)
    List<Map<String, Object>> checkAvailableRoomNumberByCateId(Long cate_id, String chekInTime, String checkOutTime, int people);
}
