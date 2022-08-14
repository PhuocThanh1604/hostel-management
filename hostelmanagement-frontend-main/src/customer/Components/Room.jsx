import React, { useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import PopupRequiredLogin from './PopupRequiredLogin'
import Popup from 'reactjs-popup';
//import PopupBooking from './PopupBooking'
import { moneyFormat } from '../../Util/Money'
import { UserContext } from '../../Context/UserContext';
import PopupBooking from './PopupBooking';
import PopupLogin from './PopupLogin';

export default function Room({ rcate, onBookNow, googleLogin, contentStyle }) {
    const [requireLogin, setRequireLogin] = useState(false)

    const [openBooking, setOpenBooking] = useState(false);
    const closeModal = () => setRequireLogin(false) || setOpenBooking(false);

    const { user } = useContext(UserContext)
    let navigate = useNavigate();

    const handleBookingNow = () => {
        navigate(`/detail/${rcate.slug}`, { state: rcate });
    }
    return (
        <>
            <div className="col-lg-4 col-md-6">
                <div className="room-item shadow overflow-hidden" style={{ borderRadius: '9px' }}>
                    <div className="position-relative">
                        <img className={(rcate.available > 0) ? "img-fluid" : "img-fluid unvailable-room"} src={rcate.image} alt={rcate.name} />
                        <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">{moneyFormat(rcate.price)}$/night</small>
                    </div>
                    <div className="p-4 mt-2">
                        <div className="d-flex justify-content-between mb-3">
                            <h5 className="mb-0">{rcate.name}</h5>
                            <div className="ps-2">
                                <small className="fa fa-star text-primary" />
                                <small className="fa fa-star text-primary" />
                                <small className="fa fa-star text-primary" />
                                <small className="fa fa-star text-primary" />
                                <small className="fa fa-star text-primary" />
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <small className="border-end me-3 pe-3"><i className="fa fa-bed text-primary me-2" />{rcate.bed} Bed</small>
                            <small className="b order-end me-3 pe-3"><i className="fa fa-bath text-primary me-2" />{rcate.bath} Bath</small>
                            <small><i className="fa fa-wifi text-primary me-2" />Wifi</small>
                        </div>
                        <p className="text-body mb-3">{rcate.description.slice(0, 200)}...<span class="text-primary pe-none" onClick={handleBookingNow}>View More</span></p>
                        <div className="d-flex justify-content-between">
                            {
                                onBookNow ? (
                                    (rcate.available > 0) ? (
                                        <button className="btn bg-primary text-white w-100" onClick={handleBookingNow} to={""}>Book Now</button>
                                    ) : (
                                        <Link className="btn btn-dark text-white disabled w-100" to={""} >Unvailable</Link>
                                    )
                                ) : (
                                    <>
                                        <button type="button" className="btn bg-primary text-white w-100" onClick={handleBookingNow}>
                                            Detail
                                        </button>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>

            {/* <Popup open={requireLogin} closeOnDocumentClick onClose={closeModal} contentStyle={contentStyle}>
                <PopupLogin googleLogin={googleLogin} closeModal={closeModal} />
            </Popup> */}

            {/* <Popup open={openBooking} closeOnDocumentClick onClose={closeModal} contentStyle={contentStyle}>
                <PopupLogin googleLogin={googleLogin} closeModal={closeModal} />
            </Popup> */}

        </>
    )
}
