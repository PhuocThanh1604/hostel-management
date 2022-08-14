import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import BookingCard from '../Components/BookingCard'

export default function Booking() {
    const [bookingList, setBookingList] = useState([])

    useEffect(() => {
        instance.get(`/booking/admin/all`).then((response) => {
            if (response.status === 200) {
                setBookingList(response.data)
            }
        })
    }, [setBookingList])

    console.log(bookingList)
    return (
        <>
            <div className="dashboard-app">
                <div className="dashboard-content">
                    <div className="container">
                        <h1>Booking List</h1>
                        {
                            bookingList.map((booking, index) =>
                                <BookingCard booking={booking} />
                            )
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
