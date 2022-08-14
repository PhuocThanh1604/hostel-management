package com.example.hostelmanage.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor
@Table(name="room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name, startTime, finishTime;

    @Column
    private double price;

    @Column
    private boolean status;


    @ManyToOne
    @JoinColumn(name = "fk_roomcategory",referencedColumnName = "id")
    private RoomCategory roomCategory;

    @ManyToOne
    @JoinColumn(name = "fk_roomstatus",referencedColumnName = "id")
    private RoomStatus roomStatus;

    @JsonIgnore
    @OneToMany(mappedBy="room", cascade = CascadeType.ALL)
    private Set<BookingDetail> bookingDetail;

}
