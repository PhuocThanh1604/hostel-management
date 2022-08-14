import React from 'react'
import { moneyFormat } from '../../Util/Money'


export default function ListInfo({ current, booking, room, user, total, countDays, available }) {
    return (
        <>
            <BKInfo current={current} booking={booking} room={room} total={total} countDays={countDays} available={available} />
            {
                current === 2 ? <PInfo current={current} room={room} user={user} booking={booking} /> : null
            }
        </>
    )
}


export const BKInfo = ({ current, booking, room, total, countDays}) => {

    return (
        <>
            <div className='border p-4'>
                {
                    (current === 1) ? (
                        <>
                            {(room.available > 0) ? (<p className='text-success'>Available: {room.available}</p>) :  (<p className='text-danger'>Hết Phòng</p>) }
                            <p className='fs-5 r-n'>{room.name}</p>
                        </>
                    ) : (
                        <div className="alert alert-warning" role="alert">
                            {room.name}
                        </div>
                    )
                }

                <div className='row'>
                    <div className='col-6 mt-2'>Check In</div>
                    <div className='col-6 mt-2 text-end'>{booking.checkInTime} 12:00PM</div>
                    <div className='col-6 mt-2'>Check Out</div>
                    <div className='col-6 mt-2 text-end'>{booking.checkOutTime} 12:00PM</div>
                    <div className='col-6 mt-2 mb-3'>Day</div>
                    <div className='col-6 mt-2 mb-3 text-end'>{countDays}</div>
                    <hr />
                    <div className='col-3 mt-2 mb-2 r-b'>Price</div>
                    <div className='col-9 mt-2 mb-2 r-p text-end'>${moneyFormat(room.price)}/day</div>
                    <hr />
                    <div className='col-6 mt-2 r-b fs-5'>Total payment</div>
                    <div className='col-6 mt-2 r-p text-end'>${moneyFormat(total)}</div>
                </div>
            </div>
        </>
    )
}

const PInfo = ({ user, booking }) => {
    return (
        <>
            <div className='border p-4 mt-3'>
                <div className="alert alert-warning" role="alert">
                    Booking Information
                </div>
                <div className='row'>
                    <div className='col-6 mt-3'>Full name</div>
                    <div className='col-6 mt-3 text-end'>{user.profile.fullName}</div>
                    <div className='col-6 mt-3'>Phone Number</div>
                    <div className='col-6 mt-3 text-end'>{user.phone || ""}</div>
                    <div className='col-6 mt-3'>Email</div>
                    <div className='col-6 mt-3 text-end'>{user.email}</div>
                    <div className='col-6 mt-3 '>People</div>
                    <div className='col-6 mt-3  text-end'>{booking.people}</div>
                    <div className='col-6 mt-3'>Note</div>
                    <div className='col-6 mt-3 text-end'>{booking.note}</div>

                </div>
            </div>
        </>
    )
}