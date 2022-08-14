import moment, { duration } from 'moment';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { set } from 'react-hook-form';
import SelectSearch, { fuzzySearch } from 'react-select-search';
import { toast } from 'react-toastify';
import instance from '../../axios';
import { durationEarly, today } from '../../Util/DateTime';
import { moneyFormat } from '../../Util/Money';
import { checkInSurcharge } from '../../Util/Total';
export default function CheckIn() {

    const [bookingList, setBookingList] = useState([]);
    const [info, setInfo] = useState({});
    const [roomList, setRoomList] = useState([]);
    const [room, setRoom] = useState(null);
    const [prePaymentMore, setPrepaymentMore] = useState(0);
    const [mustPay, setMustPay] = useState(0)
    const [firstMustPay, setFirstMustPay] = useState(0)
    const [total, setTotal] = useState(0)
    const [early, setEarly] = useState(0);
    const [surcharge, setSurcharge] = useState(0)
    const [change, setChange] = useState(0);
    const [error, setError] = useState({});
    const close = useRef(null)

    useEffect(() => {
        instance.get(`/checkin/search/all/${today}`).then((response) => {
            console.log("search to check in", response.data)
            setBookingList(response.data)

        })
    }, [setBookingList])

    const handleIdCard = (e) => {

        let bookingChoice = bookingList.find(booking => booking.id === e)
        setInfo(bookingChoice);

        /* Set surcharge */
        setSurcharge(checkInSurcharge(bookingChoice.category_price, bookingChoice.check_in_time).surcharge);

        /* Set early */
        setEarly(durationEarly(bookingChoice.check_in_time))

        /* Set Must Pay */
        setMustPay((bookingChoice.total_room - bookingChoice.prepayment))

        setFirstMustPay((bookingChoice.total_room - bookingChoice.prepayment) + checkInSurcharge(bookingChoice.category_price, bookingChoice.check_in_time).surcharge)

        /* Set total */
        setTotal(bookingChoice.total_room);

        /* Get room list */
        instance.get(`/room/search/category/${bookingChoice.category_id}/status/1`).then((response) => {
            if (response.status === 200) {
                setRoomList(response.data);
            }
        })
    }

    const handleRoom = (e) => {
        setRoom(e.target.value)
    }

    const handlePrepaymentMore = (e) => {
        const changeMoney = parseFloat(e.target.value) - firstMustPay;
        if ((parseFloat(e.target.value) < firstMustPay) || (e.target.value === "")) {
            setError({ prepaymentMore: "Not enough" })
            setPrepaymentMore(0)
            setChange(0)
        }
        else {
            setChange(changeMoney)
            setPrepaymentMore(parseFloat(e.target.value) - changeMoney)
            setError({})
        }
    }

    const handleCheckIn = () => {
        if (room === null) {
            alert('Choice a Room!')
        }

        let checkInData = {
            surcharge: surcharge,
            prepayment: prePaymentMore,
            total_room: total + surcharge,
        }
        instance.put(`/checkin/booking/${info.id}/room/${room}`, checkInData).then((response) => {
            if (response.status === 200) {
                toast.success(`Check in successfully!`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                close.current.click();
                window.location.reload();
            }
        })
    }

    return (
        <>
            <div>
                <div className="card p-1 border-0">
                    <div className="modal-header">
                        <h5 className="modal-title">Check In</h5>
                        <button type="button" ref={close} className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className='col-8'>
                                <div className="container">
                                    <div className='row'>
                                        <div className='col-12'>
                                            <label className="form-label"  >
                                                Search Id Card {""}
                                                <i className="far fa-clock" />
                                            </label>
                                            <div className="input-group mb-3">
                                                <SelectSearch
                                                    printOptions={"auto"}
                                                    closeOnSelect={true}
                                                    options={bookingList}
                                                    onChange={handleIdCard}
                                                    search
                                                    filterOptions={fuzzySearch}
                                                    placeholder="Search something"
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                        <label
                                            className="form-label" >
                                            <h6>
                                                Information{" "}
                                                <i className="far fa-question-circle" />
                                            </h6>
                                        </label>
                                        <div className='col-4'>
                                            <label className="form-label"  >
                                                Check In {""}
                                                <i className="far fa-clock" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control "
                                                disabled
                                                value={null || (info.check_in_time && info.check_in_time)}
                                            />
                                        </div>
                                        <div className='col-4'>
                                            <label className="form-label"  >
                                                Check Out {""}
                                                <i className="far fa-clock" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control "
                                                disabled
                                                value={null || (info.check_out_time && info.check_out_time)}
                                            />
                                        </div>
                                        <div className='col-4'>
                                            <label className="form-label"  >
                                                Booking Moment {""}
                                                <i className="far fa-clock" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control "
                                                disabled
                                                value={null || (info.booking_time && info.booking_time)}
                                            />
                                        </div>
                                        <div className='col-4 mt-2'>
                                            <label className="form-label"  >
                                                Days {""}
                                                <i className="far fa-filter" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control "
                                                disabled
                                                value={null || moment(info.check_out_time).diff(moment(info.check_in_time), 'days')}
                                            />
                                        </div>
                                        <div className='col-4 mt-2'>

                                            <label className="form-label"  >
                                                People {""}
                                                <i className="far fa-users" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control "
                                                disabled
                                                value={null || (info.people && info.people)}
                                            />

                                        </div>
                                        <div className='col-4 mt-2'>
                                            <label className="form-label"  >
                                                Type of Room {""}
                                                <i className="far fa-filter" />
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control "
                                                disabled
                                                value={null || (info.category && info.category)}
                                            />
                                        </div>

                                    </div>

                                    <form>
                                        <div className="mt-2">
                                            <hr />
                                            <label
                                                className="form-label" >
                                                <h6>
                                                    Customer's Info{" "}
                                                    <i className="far fa-question-circle" />
                                                </h6>
                                            </label>
                                        </div>

                                        <div className='row'>
                                            <div className='col-4'>
                                                <label className="form-label" >
                                                    Full Name{" "}
                                                    <i className="far fa-user" />
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    disabled
                                                    value={null || (info.full_name && info.full_name)}
                                                />
                                            </div>
                                            <div className='col-4'>
                                                <label className="form-label" >
                                                    Email{" "}
                                                    <i className="fa fa-envelope" />
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    disabled
                                                    value={null || (info.email && info.email)}
                                                />
                                            </div>
                                            <div className='col-4'>
                                                <label className="form-label" >
                                                    Phone{" "}
                                                    <i className="far fa-phone" />
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    disabled
                                                    value={null || (info.phone && info.phone)}
                                                />
                                            </div>
                                            <hr className='mt-3' />
                                            <label
                                                className="form-label" >
                                                <h6>
                                                    Payment{" "}
                                                    <i className="far fa-question-circle" />
                                                </h6>
                                            </label>
                                            <div className='col-4 mt-2'>
                                                <label className="form-label" >
                                                    Early{" "}
                                                    <i className="fa-solid fa-alarm-plus"></i>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    disabled
                                                    value={early}
                                                />
                                            </div>

                                            <div className='col-4 mt-2'>
                                                <label className="form-label text-danger" >
                                                    Surchage{" "}
                                                    <i className="fa-solid fa-money-check-dollar-pen"></i>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border border-danger border-2"
                                                    disabled
                                                    value={null || (moneyFormat(surcharge || 0))}
                                                />
                                            </div>

                                            <div className='col-4 mt-3'></div>

                                            <div className='col-4 mt-3'>
                                                <label
                                                    className="form-label"
                                                >
                                                    Paid <i className="far fa-money-bill-alt" />
                                                </label>
                                                <input
                                                    type="text"
                                                    value={null || (info.prepayment && moneyFormat(info.prepayment))}
                                                    className="form-control "
                                                    disabled
                                                />
                                                {((info.total_room - info.prepayment) === 0) && <p className='text-success'>Payment completed <i className="fa fa-check" aria-hidden="true"></i></p>}
                                            </div>
                                            {
                                                ((info.total_room - info.prepayment) > 0) && (
                                                    <>
                                                        <div className='col-4 mt-3'>
                                                            <label
                                                                className="form-label"
                                                            >
                                                                Must Pay <i className="far fa-money-bill-alt" />
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={null || (info.total_room && moneyFormat(mustPay))}
                                                                className="form-control "
                                                                disabled
                                                            />
                                                        </div>
                                                    </>
                                                )
                                            }

                                            <div className='col-4 mt-3'></div>
                                            {
                                                ((info.total_room - info.prepayment) > 0) && (
                                                    <>
                                                        <div className='col-4 mt-3'>
                                                            <label
                                                                className="form-label text-success"
                                                            >
                                                                Cash advance <i className="far fa-money-bill-alt" />
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="form-control border-success border-2"
                                                                onChange={handlePrepaymentMore}
                                                            />
                                                            {error.prepaymentMore && <span className='text-danger mt-3'>{error.prepaymentMore}</span>}
                                                        </div>
                                                        <div className='col-4 mt-3'>
                                                            <label
                                                                className="form-label text-warning"
                                                            >
                                                                Change <i className="far fa-money-bill-alt" />
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="form-control border border-warning border-2"
                                                                value={change}
                                                                disabled
                                                            />
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="card container">
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Room</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    roomList.map((room, index) =>
                                                        <tr>

                                                            <th scope="row">
                                                                <input className="form-check-input" type="radio" value={room.id} name="room" onChange={handleRoom} />
                                                            </th>
                                                            <td>{room.name}</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='text-center'>
                        {
                            room ? (
                                <button type="button" className="btn btn-primary btn-lg" style={{ width: '40%' }} onClick={handleCheckIn}>Check In</button>
                            ) : (
                                <button type="button" className="btn btn-primary btn-lg" style={{ width: '40%' }} disabled >Check In</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
