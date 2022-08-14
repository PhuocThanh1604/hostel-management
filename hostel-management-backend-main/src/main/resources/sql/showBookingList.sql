/* This function shows all booking on booking list for admin */

SELECT * FROM hotelmanagement.booking;

USE hotelmanagement
DELIMITER //

CREATE PROCEDURE BookingList(
)
BEGIN
SELECT
    booking.id,
    profile.full_name,
    profile.card_number,
    profile.picture as avatar,
    booking.booking_time,
    room_category.name as type,BookingListBookingListBookingListBookingList
    booking_detail.check_in_time,
        booking_detail.check_out_time,
    booking.people
FROM booking
         INNER JOIN account
                    ON account.id = booking.fk_account
         INNER JOIN profile
                    ON profile.id = account.fk_profile
         INNER JOIN booking_detail
                    ON booking_detail.fk_booking = booking.id
         INNER JOIN room_category
                    ON room_category.id = booking_detail.fk_room_category
where booking.fk_bookingstatus = 1
  AND DATEDIFF(CURDATE(), booking_detail.check_in_time) <= 0;
END //
DELIMITER ;

CALL BookingList()

