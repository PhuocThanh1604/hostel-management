package com.example.hostelmanage.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@Table(name="bookingDetail")
public class BookingDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private double totalRoom,total;

    @Column
    private String checkOutTime, checkInTime;

    @Column
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "fk_booking", referencedColumnName = "id" )
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "fk_room", referencedColumnName = "id" )
    private Room room;

    @ManyToOne
    @JoinColumn(name = "fk_roomCategory", referencedColumnName = "id" )
    private RoomCategory roomCategory;

}
