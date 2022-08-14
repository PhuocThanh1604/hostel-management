import React from 'react'
import Booking from './Booking';
import CheckIn from './CheckIn';

export default function Option({ handleFilterStatus, handleRoomNumber }) {
    return (
        <>
            <div className="status-sort-bar">
                <div className="status-sort-by-options">
                    <div className="input-group rounded border-0" style={{ width: "26%" }}>
                        <input type="text" className="form-control border-0" placeholder="Search room" onChange={handleRoomNumber} />
                        <span className="input-group-text bg-white border-0" id="basic-addon2"><i className="bi bi-search"></i></span>
                    </div>


                    <select className="form-select ms-3 border-0" style={{ width: "35%" }} onChange={handleFilterStatus}>
                        <option selected value={"All"}>Filter Room Status</option>
                        <option value="Valiable">Available</option>
                        <option value="Unvaliable">Unvailable</option>
                    </select>
                </div>
                <div>
                    <div className="select-with-status">
                        <div className="status-sort-by-options">
                            {/* Booking */}
                            <div className="status-sort-by-options_option" data-bs-toggle="modal" data-bs-target="#bookingpopup"><i className="fa-solid fa-plus me-2"></i>Booking</div>

                            <div className="modal fade" id="bookingpopup" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-fullscreen">
                                    <div className="modal-content">
                                        <Booking />
                                    </div>
                                </div>
                            </div>

                            {/* End Booking */}

                            {/* Check In */}
                            <div className="status-sort-by-options_option" data-bs-toggle="modal" data-bs-target="#checkinpopup"><i className="fa-solid fa-door-open me-2"></i>Check In</div>

                            <div className="modal fade" id="checkinpopup" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-fullscreen">
                                    <div className="modal-content">
                                        <CheckIn />
                                    </div>
                                </div>
                            </div>

                            {/* End Check In */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
