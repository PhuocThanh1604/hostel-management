package com.example.hostelmanage.repository;

import com.example.hostelmanage.model.RoomStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomStatusRepository extends CrudRepository<RoomStatus, Long> {
}
