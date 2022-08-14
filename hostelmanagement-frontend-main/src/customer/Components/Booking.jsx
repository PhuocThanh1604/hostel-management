import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';
import { BookingContext } from '../../Context/BookingContext';

export default function Booking() {

    const { booking, dispatch } = useContext(BookingContext);

    const [current, setCurrent] = useState(booking.checkInTime);

    const [checkIn, setCheckin] = useState(booking.checkInTime);
    const [checkOut, setCheckOut] = useState(booking.checkOutTime);
    const [people, setPeople] = useState(booking.people)

    let navigate = useNavigate();
    let location = useLocation();


    useEffect(() => {
        setCheckOut(booking.checkOutTime)
        setCheckin(booking.checkInTime)
        setPeople(booking.people)
    }, [booking])

    const checkInPicker = (e) => {
        dispatch({ type: 'ADD_CHECKIN', value: e.target.value })

    }

    const checkOutPicker = (e) => {
        dispatch({ type: 'ADD_CHECKOUT', value: e.target.value })
    }

    const peoplePicker = (e) => {
        console.log(e.target.value)
        dispatch({ type: 'ADD_PEOPLE', value: parseInt(e.target.value) })
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(booking)

        navigate({
            pathname: "/search",
            search: `?${createSearchParams(booking).toString()}`,
            
        });
    }

    return (
        <>
            <div className="container">
                <div className="bg-white shadow" style={{ padding: 35, borderRadius: 9 }}>
                    <div className="row g-2">
                        <div className="col-md-8">
                            <div className="row g-2">
                                <div className="col-md-4">
                                    <div className="date">
                                        <input type="date" className="form-control datetimepicker-input" placeholder="Check in" min={current} value={checkIn} onChange={checkInPicker} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="date" >
                                        <input type="date" className="form-control datetimepicker-input" placeholder="Check out" min={checkOut} value={checkOut} onChange={checkOutPicker} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <input type="number" className="form-control" value={people} onChange={peoplePicker} />
                                        <span className="input-group-text bg-white border border-start-0"><i className="bi bi-people"></i></span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-primary w-100" onClick={handleSubmit} >Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
