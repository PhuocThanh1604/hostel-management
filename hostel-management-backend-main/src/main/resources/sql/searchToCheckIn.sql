/* Show all customers have checked in at this time */

SELECT * FROM hotelmanagement.booking;

DELIMITER //

CREATE PROCEDURE SearchtoCheckIn(
    IN checkInTime varchar(20)
)
BEGIN
SELECT
    booking.id as id,
    booking.booking_time,
    booking.id as value,
booking.people as people,
account.email,
profile.card_number as name,
profile.full_name,
booking_detail.check_in_time,
booking_detail.check_out_time,
room_category.name as category,
room_category.id as category_id,
room_category.price as category_price
FROM booking_detail
    INNER JOIN booking
ON booking_detail.fk_booking = booking.id
    INNER JOIN room_category
    ON booking_detail.fk_room_category = room_category.id
    INNER JOIN account
    ON booking.fk_account = account.id
    INNER JOIN  profile
    ON account.fk_profile = profile.id
WHERE booking.fk_bookingstatus = 1
  AND booking_detail.check_in_time = checkInTime;

END //

DELIMITER ;

CALL SearchtoCheckIn("2022-07-05")


