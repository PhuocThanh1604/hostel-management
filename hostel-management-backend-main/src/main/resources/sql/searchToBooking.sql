/* Show available rooms and unvailable rooms of each rooms at moment A to moment B */

use hotelmanagement;

DELIMITER //
CREATE PROCEDURE searchtoBooking(
    IN checkInTime varchar(20),
    IN checkOutTime varchar(20),
    IN peopleQtt int
)
BEGIN
SELECT
    Room_category.id,
    Room_category.name,
    Room_category.description,
    Room_category.image,
    Room_category.people,
    Room_category.price,
    Room_category.slug,
    COUNT( booking_detail.id) AS Booked,
    ((SELECT COUNT(*) FROM Room WHERE Room.fk_roomcategory = Room_Category.id) - COUNT(booking_detail.fk_room_category)) AS Available
FROM booking_detail
         RIGHT JOIN Room_Category
                    ON  Room_Category.id = booking_detail.fk_room_category
                        AND (DATE(Booking_Detail.check_in_time) <= checkOutTime
                            AND DATE(Booking_Detail.check_out_time) >= checkInTime)
                        AND booking_detail.fk_booking IN (SELECT booking.id FROM booking WHERE booking.fk_bookingstatus = 1)
WHERE Room_Category.people >= peopleQtt
GROUP BY
    Room_category.id,
    Room_category.name,
    Room_category.description,
    Room_category.image,
    Room_category.people,
    Room_category.price,
    Room_category.slug;

END //

DELIMITER ;

CALL searchtoBooking("2022-07-04", "2022-07-11", 1)