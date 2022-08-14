package com.example.hostelmanage.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor
public class RoomCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String name, slug;

    @Lob
    @Column
    private String image, description;

    @Column
    private double price;

    @Column
    private int people, bed, bath;


    @Column
    private boolean status;


    @JsonIgnore
    @OneToMany(mappedBy="roomCategory", cascade = CascadeType.ALL)
    private Set<Room> room;

    @JsonIgnore
    @OneToMany(mappedBy = "roomCategory", cascade = CascadeType.ALL)
    private Set<BookingDetail> bookingDetails;

}
