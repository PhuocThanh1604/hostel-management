import React from 'react'
import instance from '../../axios';

export default function PurchaseItem({ checkInTime, checkOutTime, total, tab, bookingId, onTab, roomCategory, image }) {

    const handleCancel = () => {
        const jwt = sessionStorage.getItem("jwt");

        instance.put(`/booking/cancel/${bookingId}`, { status: true },
            {
                headers: { 'Authorization': jwt },
            }
        ).then((response) => {
            console.log(response)
            onTab(3)
        }).catch((error) => console.log(error))
    }
    return (
        <>
            <div className="card">
                <div className="card-horizontal">
                    <div className="img-square-wrapper">
                        <img src={image} alt={roomCategory} style={{width: 'auto', height: '180px'}}/>
                    </div>
                    <div className="card-body">
                        <p className="card-text">Check In: {checkInTime}</p>
                        <p className="card-text">Check Out: {checkOutTime}</p>
                        <p className="card-text">Type of Room: {roomCategory}</p>
                        <p className="card-text">Total: ${total}</p>

                    </div>
                    <div class="p-3">
                        {
                            (tab === 'topay') && (
                                <button class="btn btn-danger" onClick={handleCancel}>Cancel</button>
                            )

                        }
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
