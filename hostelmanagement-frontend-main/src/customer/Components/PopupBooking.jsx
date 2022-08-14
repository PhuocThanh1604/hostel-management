import React from 'react'
import Booking from './Booking'

export default function PopupBooking({ close }) {
    return (
        <>
            <div className="modal-content border-0" style={{ width: '1140px' }}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Booking</h5>
                    <button type="button" className="btn-close" onClick={close} />
                </div>
                <div className="modal-body">
                    <Booking />
                </div>
            </div>

        </>
    )
}
