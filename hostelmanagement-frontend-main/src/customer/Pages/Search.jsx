import React, { useEffect, useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom';
import instance from '../../axios';
import Booking from '../Components/Booking';
import Loading from '../Components/Loading';
import RoomList from '../Components/RoomList';

export default function Search({ googleLogin }) {
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [checkIn, setCheckin] = useState(searchParams.get('checkInTime'))
    const [checkOut, setCheckOut] = useState(searchParams.get('checkOutTime'))
    const [people, setPeople] = useState(searchParams.get('people'));

    const [roomcategories, setRoomCategories] = useState([]);

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setCheckin(searchParams.get('checkInTime'))
        setCheckOut(searchParams.get('checkOutTime'))
        setPeople(searchParams.get('people'))
    }, [searchParams])

    useEffect(() => {
        instance.get(`/booking/search/${checkIn}/to/${checkOut}/p/${parseInt(people)}`)
            .then((response) => {
                setLoading(false)
                console.log("TESTEST", response.data)
                setRoomCategories(response.data);
            })
            .catch((error) => console.log(error))
    }, [setRoomCategories, checkIn, checkOut, people]);

    return (
        <>
            {loading && <Loading />}
            <RoomList rooms={roomcategories} onBookNow={true} googleLogin={googleLogin} >
                <div className='mb-3'>
                    <Booking />
                </div>
            </RoomList>
        </>
    )
}
