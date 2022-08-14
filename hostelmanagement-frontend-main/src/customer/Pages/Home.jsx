import React, { useContext, useEffect, useState } from 'react'
import instance from '../../axios';
import { BookingContext } from '../../Context/BookingContext';
import About from '../Components/About'
import Booking from '../Components/Booking';
import Carousel from '../Components/Carousel'
import Loading from '../Components/Loading';
import RoomList from '../Components/RoomList';

export default function Home({ googleLogin }) {
  const [loading, setLoading] = useState(true);
  const [roomcategories, setRoomcategories] = useState([]);
  const { booking } = useContext(BookingContext);
  console.log(booking);

  useEffect(() => {
    // instance.get("/roomcategory/all").then((response) => {
    //   console.log(response);

    //   if (response.status === 200) {
    //     setLoading(false)
    //     setRoomcategories(response.data);
    //   }
    // }

    instance.get(`/booking/search/${booking.checkInTime}/to/${booking.checkOutTime}/p/1`)
      .then((response) => {
        setLoading(false)
        setRoomcategories(response.data);
      })
      .catch((error) => console.log(error))





  }, [setRoomcategories]);

  return (
    <>
      {loading && <Loading />}
      <div className="container-fluid bg-white p-0">
        <Carousel />

        <div className="container-fluid booking pb-5 wow fadeIn">
          <Booking />
        </div>

        <About />

        <RoomList rooms={roomcategories} onBookNow={false} googleLogin={googleLogin} />

      </div>
    </>
  )
}
