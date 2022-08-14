import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import instance from '../../axios';
import { BookingContext } from '../../Context/BookingContext';
import { BKInfo } from '../../customer/Components/ListInfo';

export default function Booking({ close }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            prepayment: 0
        }
    });
    const { booking, dispatch } = useContext(BookingContext);
    const [current, setCurrent] = useState(booking.checkInTime);
    const [checkIn, setCheckin] = useState(booking.checkInTime);
    const [checkOut, setCheckOut] = useState(booking.checkOutTime);
    const [peopleNumber, setPeopleNumber] = useState(0);
    const [roomCategories, setRoomCategories] = useState([])
    const [cateOption, setCateOption] = useState(null);
    const [countDays, setCountDays] = useState(0)
    const [total, setTotal] = useState(0);
    const [totalRoom, setTotalRoom] = useState(0);
    const [error, setError] = useState({});

    let navigate = useNavigate();

    useEffect(() => {
        setCheckOut(booking.checkOutTime)
        setCheckin(booking.checkInTime)
    }, [booking])

    useEffect(() => {
        setCountDays(moment(booking.checkOutTime).diff(moment(booking.checkInTime), 'days'));
    }, [booking.checkInTime, booking.checkOutTime])

    useEffect(() => {
        if (cateOption) {
            if (watch("prepayment") <= JSON.parse(cateOption).price) {
                setTotal((JSON.parse(cateOption).price * parseInt(countDays)) - watch("prepayment"));
                setTotalRoom(JSON.parse(cateOption).price * parseInt(countDays));
                setError({})
            } else {
                setError({ prepayment: "Prepayment must be small than total" })
            }
        }
    }, [countDays, cateOption, watch("prepayment")])

    const checkInPicker = (e) => {
        dispatch({ type: 'ADD_CHECKIN', value: e.target.value })

    }

    const checkOutPicker = (e) => {
        dispatch({ type: 'ADD_CHECKOUT', value: e.target.value })
    }

    const handlePeople = (e) => {
        setPeopleNumber(e.target.value)

        instance.get(`/booking/search/${checkIn}/to/${checkOut}/p/${peopleNumber}`).then((response) => {
            setRoomCategories(response.data)
            console.log("search booking", response.data)
        })

        dispatch({ type: 'ADD_PEOPLE', value: e.target.value })
    }

    const handleCategory = (e) => {
        setCateOption(e.target.value)
    }

    const onSubmit = data => {
        if (JSON.parse(cateOption).id === null) {
            toast.error("SELECT A ROOM TYPE !", {
                position: toast.POSITION.TOP_LEFT
            });

        }
        booking.total_room = totalRoom;
        let bookingData = {
            ...booking,
            ...data
        };

        console.log(bookingData)

        instance.post(`/booking/admin/create/roomCategory/${JSON.parse(cateOption).id}`, bookingData).then((response) => {
            console.log(response)

            if (response.status === 201) {
                toast.success(`Book a room successfully!`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                close();
            }
        })
    }
    return (
        <>
            <div className="card p-1 border-0" >
                <div className="modal-header">
                    <h5 className="modal-title">Booking</h5>
                    <button type="button" onClick={close} className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className='row'>
                    <div className={cateOption ? 'col-8' : 'col-12'}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <div className="container" >
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label className="form-label"  >
                                                Check In{" "}
                                                <i className="far fa-clock" />
                                            </label>
                                            <br />
                                            <input
                                                type="date"
                                                className="date form-control"
                                                name="date"
                                                min={current} value={checkIn} onChange={checkInPicker}
                                            />
                                        </div>
                                        <div className='col-6'>
                                            <label className="form-label"  >
                                                Check Out{" "}
                                                <i className="far fa-clock" />
                                            </label>
                                            <br />
                                            <input
                                                type="date"
                                                className="date form-control"
                                                name="date"
                                                min={moment(checkIn).add(1, 'days').format("YYYY-MM-DD")} value={checkOut} onChange={checkOutPicker}
                                            />
                                        </div>

                                        <div className="col-12 mt-3">
                                            <label className="form-label"  >
                                                People {""}
                                                <i className="fa fa-users" />
                                                {" "}(<span className='text-danger'>*</span>)
                                            </label>
                                            <select className="form-select" onChange={handlePeople} required>
                                                <option selected>People quantity</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                            </select>
                                        </div>

                                        <div className="col-12 mt-1">
                                            <label className="form-label"  >
                                                Type of Room {""}
                                                <i className="fa fa-filter" />
                                                {" "}(<span className='text-danger'>*</span>)
                                            </label>
                                            {
                                                (roomCategories.length > 0) ? (
                                                    <>
                                                        <select required className="form-select" onChange={handleCategory}>
                                                            <option selected disabled>Choose a type</option>
                                                            {
                                                                roomCategories.map((cate, index) =>
                                                                    (cate.available > 0) && (
                                                                        <>
                                                                            <option value={JSON.stringify(cate)}>{cate.name}</option>
                                                                        </>
                                                                    )
                                                                )
                                                            }

                                                        </select>
                                                    </>
                                                ) : (
                                                    <>
                                                        <select className="form-select" disabled>
                                                            <option selected>Type of room</option>
                                                        </select>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <form>
                                        <div className="mt-1">
                                            <hr />
                                            <label
                                                className="form-label" >
                                                <h6>
                                                    Customer's information{" "}
                                                    <i className="far fa-question-circle" />
                                                </h6>
                                            </label>
                                        </div>

                                        <div className='row'>
                                            <div className='col-6'>
                                                <label
                                                    className="form-label"
                                                >
                                                    ID Card <i className="far fa-id-card" />
                                                    {" "}(<span className='text-danger'>*</span>)
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control "
                                                    {...register("cardNumber", { required: true })}
                                                />
                                            </div>
                                            <div className='col-6 mt-1'>
                                                <label
                                                    className="form-label"
                                                >
                                                    Name{" "}
                                                    <i className="far fa-user" />
                                                    {" "}(<span className='text-danger'>*</span>)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("fullName", { required: true })}
                                                />
                                            </div>
                                            <div className='col-6 mt-1'>
                                                <label
                                                    className="form-label"
                                                >
                                                    Email{" "}
                                                    <i className="fa fa-envelope" />
                                                    {" "}(<span className='text-danger'>*</span>)
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    {...register("email", { required: true })}
                                                />
                                            </div>
                                            <div className='col-6 mt-1'>
                                                <label
                                                    className="form-label"
                                                >
                                                    Phone{" "}
                                                    <i className="fa fa-phone" />
                                                    {" "}(<span className='text-danger'>*</span>)
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    {...register("phone", { required: true })}
                                                />
                                            </div>
                                            <div className="mb-1 mt-1 col-12">
                                                <label className="form-label">
                                                    Prepayment <i className="far fa-money-bill-alt" />
                                                    {" "}(<span className='text-danger'>*</span>)
                                                </label>
                                                {
                                                    cateOption ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                {...register("prepayment", { min: 0, max: JSON.parse(cateOption).price, required: true })}
                                                            />
                                                            {error.prepayment && <span className='text-danger mt-3'>{error.prepayment}</span>}
                                                        </>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            disabled
                                                        />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='text-center'>
                                {
                                    (cateOption && (peopleNumber > 0)) ? (
                                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '40%' }} onClick={handleSubmit}>Book</button>
                                    ) : (
                                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '40%' }} disabled >Book</button>
                                    )
                                }

                            </div>
                        </form>
                    </div>
                    {
                        cateOption && (
                            <div className='col-4 p-3'>
                                <BKInfo current={1} booking={booking} room={JSON.parse(cateOption)} total={total} countDays={countDays} />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
