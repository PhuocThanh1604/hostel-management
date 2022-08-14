import React from 'react'
import Room from './Room'


export default function RoomList({ children, rooms, onBookNow, googleLogin }) {
    return (
        <>
            <div className="container-xxl py-5 bg-white">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title text-center text-primary text-uppercase">Our Rooms</h6>
                        <h1 className="mb-2">Explore Our <span className="text-primary text-uppercase">Rooms</span></h1>
                    </div>
                    {children}
                    <div className="row g-4 mt-4">
                        {
                            rooms.map((rcate, index) => {
                                return (
                                    <>
                                        <Room rcate={rcate} onBookNow={onBookNow} googleLogin={googleLogin} />
                                    </>
                                )
                            }
                            )
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
