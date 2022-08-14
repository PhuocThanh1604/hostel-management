import React, { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import instance from '../../axios';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function Detail({ room, type }) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            prepayment: 0
        }
    });
    const [detail, setDetail] = useState(null);
    const [mustPay, setMustPay] = useState(0)
    const [mustPayf, setMustPayf] = useState(0)
    const [prePaymentMore, setPrepaymentMore] = useState(0);
    const [error, setError] = useState({});
    const [change, setChange] = useState(0);
    const [moneyRefund, setMoneyRefund] = useState(0);
    const [total, setTotal] = useState(0)
    const closeDetail = useRef(null);
    const openChangeRoom = useRef(null);

    useEffect(() => {
        instance.get(`/checkin/detail/room/${room.id}`).then((response) => {
            if (response.status === 200) {
                console.log("detail", response.data)
                setDetail(response.data)
                setMustPay(response.data.total_room - response.data.prepayment)
                setMustPayf(response.data.total_room - response.data.prepayment)
            }
        })
    }, [setDetail])


    const handleCheckOut = (e) => {
        console.log("tessss", moment(e.target.value).diff(moment(detail.check_in_time), 'days'))


        if (moment(e.target.value).diff(moment(detail.check_in_time), 'days') == 0) {
            setMoneyRefund(0)
            if (detail.prepayment > 0) {
                setMoneyRefund(detail.prepayment - type.price)
                setPrepaymentMore(type.price)
            } else {
                setMoneyRefund(mustPayf - type.price)
            }

            setTotal(type.price)
            setMustPay(type.price)
        }

        else if (moment(e.target.value).diff(moment(detail.check_out_time), 'days') > 0) {
            setMoneyRefund(0)
            let count = moment(e.target.value).diff(moment(detail.check_out_time), 'days');
            console.log("2", count);
            const subTotal = count * (type.price);
            console.log(subTotal)

            if (detail.prepayment > 0) {
                setTotal(detail.total_room + subTotal)
                setMustPay(subTotal)
            } else {
                setTotal(detail.total_room + subTotal)
                setMustPay(detail.total_room + subTotal)
            }

        }

        else if (moment(e.target.value).diff(moment(detail.check_out_time), 'days') < 0) {
            setMoneyRefund(0)
            let count = moment(e.target.value).diff(moment(detail.check_in_time), 'days');
            console.log("3", count);
            const subTotal = count * (type.price);

            if (detail.prepayment > 0) {
                setMoneyRefund(detail.prepayment - subTotal)
                setPrepaymentMore(subTotal)

            } else {
                setMoneyRefund(mustPayf - subTotal)
                setMustPay(subTotal)

            }

            setTotal(subTotal);

        } else {
            setMoneyRefund(0)
            setTotal(detail.total_room)
            setMustPay(detail.total_room - detail.prepayment)
        }

    }

    const handlePrepaymentMore = (e) => {

        const changeMoney = parseFloat(e.target.value) - mustPay;
        if ((parseFloat(e.target.value) < mustPay) || (e.target.value === "")) {
            setError({ prepaymentMore: "Not enough" })
            setPrepaymentMore(0)
            setChange(0)
        }
        else {
            setChange(changeMoney)
            setPrepaymentMore(detail.prePaymentMore + parseFloat(e.target.value) - changeMoney)
            setError({})
        }
    }

    const updateInfo = (data) => {
        data.prepayment = prePaymentMore;
        data.total_room = total;
        instance.put(`/booking/update/id/${detail.id}`, data).then((response) => {
            console.log(response)
            if (response.status === 200) {
                toast.success(`Update successfully!`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                closeDetail.current.click();
                window.location.reload();
            }
        })
    }
    return (
        <>
            {
                detail && (
                    <>
                        <div className="card p-1 border-0">
                            <div className="modal-header">
                                <h5 className="modal-title">Detail - {room.name} </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeDetail} />

                            </div>
                            <form onSubmit={handleSubmit(updateInfo)}>
                                <div className="modal-body">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='row'>
                                                <label
                                                    className="form-label text-start" >
                                                    <h6>
                                                        Basic Information{" "}
                                                        <i className="far fa-question-circle" />
                                                    </h6>
                                                </label>
                                                <div className='col-6 text-start'>
                                                    <label className="form-label text-start"  >
                                                        Check In{" "}
                                                        <i className="far fa-clock" />
                                                    </label>
                                                    <br />
                                                    <input
                                                        type="date"
                                                        className="date form-control"
                                                        name="date"
                                                        value={detail.check_in_time}
                                                        disabled
                                                    />
                                                </div>
                                                <div className='col-6 text-start'>
                                                    <label className="form-label text-start"  >
                                                        Check Out{" "}
                                                        <i className="far fa-clock" />
                                                    </label>
                                                    <br />
                                                    <input
                                                        type="date"
                                                        className="date form-control"
                                                        name="date"
                                                        defaultValue={detail.check_out_time}
                                                        {...register("checkOutTime")}
                                                        onChange={handleCheckOut}
                                                        min={detail.check_in_time}
                                                    />
                                                </div>

                                                <div className="col-6 mt-3 text-start">
                                                    <label className="form-label text-start"  >
                                                        People {""}
                                                        <i className="far fa-clock" />
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control "
                                                        {...register("people")}
                                                        defaultValue={detail.people}
                                                    />
                                                </div>

                                                <div className="col-6 mt-3 mb-3 text-start">
                                                    <label className="form-label text-start"  >
                                                        Type of Room {""}
                                                        <i className="far fa-clock" />
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control "
                                                        value={type.name}
                                                        disabled
                                                    />
                                                </div>

                                                <hr />
                                                <label
                                                    className="form-label text-start" >
                                                    <h6>
                                                        Customer's Information{" "}
                                                        <i className="far fa-question-circle" />
                                                    </h6>
                                                </label>
                                                <div className='col-4 text-start'>
                                                    <label
                                                        className="form-label"
                                                    >
                                                        ID Card <i className="far fa-id-card text-start" />
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control "
                                                        value={detail.card_number}
                                                        disabled
                                                    />
                                                </div>
                                                <div className='col-4 text-start'>
                                                    <label
                                                        className="form-label text-start"
                                                    >
                                                        Name{" "}
                                                        <i className="far fa-user" />
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control "
                                                        value={detail.full_name}
                                                        disabled
                                                    />
                                                </div>
                                                <div className='col-4 mb-3 text-start'>
                                                    <label
                                                        htmlFor="exampleInputPassword1"
                                                        className="form-label text-start"
                                                    >
                                                        Phone{" "}
                                                        <i className="far fa-phone" />
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control "
                                                        value={detail.phone}
                                                        disabled
                                                    />
                                                </div>
                                                <hr />
                                                <label
                                                    className="form-label text-start" >
                                                    <h6>
                                                        Payment{" "}
                                                        <i className="far fa-question-circle" />
                                                    </h6>
                                                </label>
                                                <div className="col-4 text-start">
                                                    <label className="form-label">
                                                        Paid <i className="far fa-money-bill-alt" />
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control "
                                                        value={detail.prepayment}
                                                        disabled
                                                    />
                                                    {(((detail.total_room - detail.prepayment) === 0) && (mustPay < 0)) && <p className='text-success'>Payment completed <i className="fa fa-check" aria-hidden="true"></i></p>}
                                                </div>
                                                <div className='col-4 text-start'>

                                                    <label
                                                        className="form-label text-danger"
                                                    >
                                                        Must Pay <i className="far fa-money-bill-alt" />
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={(detail.total_room && mustPay)}
                                                        className="form-control border border-danger border-2"
                                                        disabled
                                                    />

                                                </div>

                                                <div className="col-4 text-start">
                                                    <label className="form-label text-info">
                                                        Return <i className="far fa-money-bill-alt" />
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control border border-info"
                                                        value={moneyRefund}
                                                        disabled
                                                    />
                                                </div>

                                                {

                                                    (((mustPay) > 0) && (moneyRefund <= 0)) && (
                                                        <>
                                                            <div className="col-6 mb-3 text-start">
                                                                <label
                                                                    className="form-label text-success"
                                                                >
                                                                    Cash advance <i className="far fa-money-bill-alt" />
                                                                </label>
                                                                <input
                                                                    type="nubmer"
                                                                    className="form-control border-success border-2"
                                                                    {...register("prepayment")}
                                                                    onChange={handlePrepaymentMore}
                                                                />
                                                                {error.prepaymentMore && <span className='text-danger mt-3'>{error.prepaymentMore}</span>}
                                                            </div>

                                                            <div className="col-6 mb-3 text-start">
                                                                <label
                                                                    className="form-label text-warning"
                                                                >
                                                                    Change  <i className="far fa-money-bill-alt" />
                                                                </label>
                                                                <input
                                                                    type="nubmer"
                                                                    className="form-control border border-warning border-2"
                                                                    disabled
                                                                    value={change}
                                                                />
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className='col-6 text-end'>
                                            {/* Change room popup */}
                                            <button type="button" className="btn btn-danger me-5" data-bs-toggle="modal" data-bs-target="#changeroompopup" onClick={() => openChangeRoom.current.click()}>
                                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                                {" "}Change Room
                                            </button>

                                            {/* End Change room popup */}
                                        </div>

                                        <div className='text-center mt-5'>
                                            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '40%' }} >Update</button>
                                            {" "}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <ChangeRoom type={type} booking={detail} openChangeRoom={openChangeRoom} />
                    </>
                )

            }

        </>
    )
}

const ChangeRoom = ({ type, booking, openChangeRoom }) => {
    console.log(booking)
    const [roomList, setRoomList] = useState([]);
    const [room, setRoom] = useState(null);

    useEffect(() => {
        instance.get(`/room/search/category/${type.id}/status/1`).then((response) => {
            if (response.status === 200) {
                setRoomList(response.data);
            }
        })
    }, [setRoomList])

    const handleRoom = (e) => {
        setRoom(JSON.parse(e.target.value))
    }

    const handleChange = async () => {
        const change = await instance.put(`/checkin/change/${booking.id}/room/${room.id}`, null);

        if (change.status === 200) {
            toast.success("Change Room successfully !", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            window.location.reload();
        }
    }
    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${booking.id}`} style={{ display: 'none' }} ref={openChangeRoom}>
                Launch static backdrop modal
            </button>

            <div className="modal fade" id={`staticBackdrop${booking.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="card container">
                                <div className="modal-header">
                                    <h5 className="modal-title">Change Room </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name of Room</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                roomList.map((room, index) =>
                                                    <tr>
                                                        <th scope="row">
                                                            <input className="form-check-input" type="radio" value={JSON.stringify(room)} name="room" onChange={handleRoom} />
                                                        </th>
                                                        <td>{room.name}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        room ? (
                                            <>
                                                <div className='text-center'>
                                                    <button type="button" className="btn btn-primary" onClick={handleChange}>Change</button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className='text-center'>
                                                    <button type="button" className="btn btn-primary" disabled>Change</button>
                                                </div>
                                            </>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
