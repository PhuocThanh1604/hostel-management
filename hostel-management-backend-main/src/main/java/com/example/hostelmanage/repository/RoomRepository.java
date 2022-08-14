package com.example.hostelmanage.repository;

import com.example.hostelmanage.model.Room;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RoomRepository  extends CrudRepository<Room, Long> {

    @Query(value = "SELECT * FROM Room r WHERE r.fk_roomcategory = ?1 AND r.fk_roomstatus = ?2", nativeQuery = true)
    List<Room> findValRoomByRoomCategoryId(Long roomCategoryId, Long roomStatusId);

}
