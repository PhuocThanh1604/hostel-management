package com.example.hostelmanage.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Searching {
    private Long id;

    private String name, slug, image, description;

    private double price;

    private int people, available, booked;
}
