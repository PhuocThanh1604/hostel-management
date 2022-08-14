import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Steps, StepsProvider, useSteps } from "react-step-builder";
import { toast } from 'react-toastify';
import instance from '../../axios';
import { BookingContext } from '../../Context/BookingContext';
import { UserContext } from '../../Context/UserContext';
import Infomation from '../Components/Infomation';
import ListInfo from '../Components/ListInfo';
import Loading from '../Components/Loading';
import Payment from '../Components/Payment';
import Paypal from '../Components/Paypal';

export default function Checkout({ googleLogin }) {
    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState(null);
    const { pathname, state } = useLocation();
    const { id } = useParams();

    useEffect(() => {
        setLoading(false)
        window.scrollTo(0, 0);
        setRoom(state)
    }, [pathname]);

    if (state === null) {
        return <Navigate to="/" replace={true} />
    } else {
        return (
            <>
                {loading && <Loading />}
                {
                    room && (
                        <div className="container-xxl bg-white p-0">
                            <StepsProvider>
                                <MySteps room={room} id={id} googleLogin={googleLogin} />
                            </StepsProvider>
                        </div>
                    )
                }

            </>

        )
    }
}

const MySteps = ({ room, id, googleLogin }) => {
    const { user } = useContext(UserContext);
    const { booking, dispatch } = useContext(BookingContext);
    const [total, setTotal] = useState(0);
    const [countDays, setCountDays] = useState(0)

    const [steps, setSteps] = useState(1);
    const { next, prev, current } = useSteps();

    useEffect(() => {
        setCountDays(moment(booking.checkOutTime).diff(moment(booking.checkInTime), 'days'));
    }, [booking.checkInTime, booking.checkOutTime])

    useEffect(() => {
        const totalCal = room.price * parseInt(countDays);
        setTotal(totalCal);
    }, [countDays])

    useEffect(() => {
        setSteps(current);
    }, [next, prev]);

    useEffect(() => {

        instance.get(`/roomcategory/check/roomCategory/${room.id}/time/${booking.checkInTime}/to/${booking.checkOutTime}/p/${booking.people}`).then((response) => {

        }).catch((error) => console.log(error))

    }, [booking.checkInTime, booking.checkOutTime])

    let navigate = useNavigate();

    const handlePayment = (method) => {

        booking.total_room = total;

        (method === 1) && (booking.prepayment = 0);
        (method === 2) && (booking.prepayment = total);

        const token = sessionStorage.getItem("jwt");

        instance.post(`/booking/user/create/roomCategory/${id}`, booking, {
            headers: {
                'Authorization': token
            }
        }).then((response) => {
            toast.success("Booking successful!", {
                position: toast.POSITION.TOP_RIGHT
            });

            setTimeout(() => {
                navigate("/purchase");
            }, 3000);

        }).catch((error) => {
            toast.error("Booking failed!", {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }

    return (
        <>
            <div className="container-xxl py-5 bill-information">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title text-center text-primary text-uppercase">Room Booking</h6>
                        <h1 className="mb-5">Book A <span className="text-primary text-uppercase">{room.name} Room</span></h1>
                    </div>
                    <div className="row g-5">
                        <Steps>
                            <div className='col-lg-7'>
                                <Infomation
                                    next={next}
                                    user={user}
                                    booking={booking}
                                    dispatch={dispatch}
                                    room={room}
                                    googleLogin={googleLogin}
                                />
                            </div>
                            <div className='col-lg-7'>
                                <Payment next={next} prev={prev} handlePayment={() => handlePayment(1)} />
                            </div>
                            <div className='col-lg-7'>
                                <Paypal total={total} room={room} day={countDays} handlePayment={() => handlePayment(2)} />
                            </div>
                        </Steps>
                        <div className="col-lg-5">
                            <ListInfo current={current} booking={booking} room={room} user={user} total={total} countDays={countDays} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};