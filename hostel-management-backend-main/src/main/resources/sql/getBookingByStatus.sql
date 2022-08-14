/*
Get booking list by status for user's purchase
This function give two parameters: account id, booking status id
We have 4 booking status that depend on database:
    To pay = 1
    Cancel = 3
    Staying = 4
    Complete = 2

*/

DELIMITER //
CREATE PROCEDURE getBookingbyStatus(
    IN accountId long,
    IN bookingstatusId long
)
BEGIN
SELECT
    booking.id,
    booking_detail.check_in_time,
    booking_detail.check_out_time,
    booking.booking_time,
    booking.people,
    booking_detail.total,
    room_category.name,
    room_category.image,
    room_category.slug
FROM booking_detail
         INNER JOIN booking
                    ON ((booking.id = booking_detail.fk_booking)
                        AND (booking.fk_account = accountId)
                        AND (booking.fk_bookingstatus = bookingstatusId))
         LEFT JOIN room_category
                   ON room_category.id = booking_detail.fk_room_category;
END //
DELIMITER ;

CALL getBookingbyStatus(4, 1)

