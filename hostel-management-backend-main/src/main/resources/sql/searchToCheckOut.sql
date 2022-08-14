/* Show all customers have checked out at this time */

SELECT * FROM hotelmanagement.booking;

USE hotelmanagement
USE hotelmanagement
DELIMITER //

CREATE PROCEDURE SearchtoCheckOut(
    IN roomID long
)
BEGIN
SELECT
    booking.id,
    booking.prepayment,
    booking.surcharge,
    booking_detail.check_in_time,
    booking_detail.check_out_time,
    DATEDIFF(CURDATE(), booking_detail.check_out_time) as overTime,
    account.email,
    account.phone,
    profile.card_number,
    profile.full_name,
    booking_detail.total_room,
    room_category.price as roomcate_price
FROM booking_detail
         INNER JOIN booking
                    ON booking_detail.fk_booking = booking.id
         INNER JOIN room_category
                    ON booking_detail.fk_room_category = room_category.id
         INNER JOIN account
                    ON booking.fk_account = account.id
         INNER JOIN  profile
                     ON account.fk_profile = profile.id
WHERE booking.fk_bookingstatus = 4
  AND booking_detail.fk_room = roomID;
END //

DELIMITER ;

CALL SearchtoCheckOut(19)

