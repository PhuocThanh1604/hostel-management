import React from 'react'

export default function BookingCard({booking}) {
    return (
        <>
            <div className="card mt-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-1">
                            <div className="text-center">
                                <div className="img-booking-chg">
                                    <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-10">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <label htmlFor="text" className="text-muted booking-text-chg-imp"> <i className="fa-duotone fa-user me-2" />{booking.full_name}</label>
                                    </div>
                                    <div className="col-sm-3">
                                        <label htmlFor="text" className="text-muted booking-text-chg-imp"> <i className="fa-duotone fa-phone me-2" />{booking.card_number}</label>
                                    </div>
                                    <div className="col-sm-3">
                                        <label htmlFor="text" className="text-muted booking-text-chg-imp"> <i className="fa-thin fa-user me-2" />{booking.type}</label>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-3">
                                        <div className="row">
                                            <div className="col-sm-1">
                                                <i className="fa-duotone fa-calendar-clock mt-3" />
                                            </div>
                                            <div className="col-sm-11" style={{ marginRight: '-0.5rem' }}>
                                                <label className="booking-text-chg-imp-1 ">Booking
                                                    time</label>
                                                <label htmlFor="text" className="text-muted small booking-text-chg-imp">{booking.booking_time}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="row">
                                            <div className="col-sm-1">
                                                <i className="fa-duotone fa-calendar-check mt-3" />
                                            </div>
                                            <div className="col-sm-7">
                                                <label className="booking-text-chg-imp-1">Check In</label>
                                                <label htmlFor="text" className="text-muted small booking-text-chg-imp">{booking.check_in_time}</label>
                                            </div>
                                            <div className="col-sm-3">
                                                <i className="fa-duotone fa-slash-forward fa-2x mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="row">
                                            <div className="col-sm-1">
                                                <i className="fa-duotone fa-calendar-check mt-3" />
                                            </div>
                                            <div className="col-sm-8">
                                                <label className="booking-text-chg-imp-1">Check Out</label>
                                                <label htmlFor="text" className="text-muted small booking-text-chg-imp">{booking.check_out_time}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 booking-col-e-chg">
                                        <div className="row">
                                            <div className="col-sm-1 me-1">
                                                <i className="fa-duotone fa-arrows-down-to-people mt-3" />
                                            </div>
                                            <div className="col-sm-8">
                                                <label className="d-block" style={{ fontWeight: 600 }}>People</label>
                                                <label htmlFor="text" className="text-muted small booking-text-chg-imp" s>{booking.people}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-sm-1 booking-chg-col-e-btn">
                                        <button type="submit" className="button-profile-edit-booking mt-4 "><a href="./Main.html"> <i className="fa-thin fa-circle-check me-1" /> booking</a>
                                        </button>
                                    </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
