import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import instance from '../../axios';
import AddRoomForm from '../Components/AddRoomForm';
import CateRow from '../Components/CateRow';

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [roomCategories, setRoomCategories] = useState([]);
    const [onAdd, setOnAdd] = useState(false);

    useEffect(() => {
        instance.get("/room/all").then((response) => {
            setRooms(response.data)
            setOnAdd(false)
            console.log(response)
        })
    }, [setRooms, onAdd])

    useEffect(() => {
        instance.get("/roomcategory/all").then((response) => {
            setRoomCategories(response.data)
            console.log(response)
        })
    }, [setRoomCategories])



    return (
        <>
            <div className="dashboard-app">
                <div className="dashboard-content">

                    <div className="container-fluid">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-12">
                                <div className="row">
                                    <nav className="navbar navbar-light ">
                                        <h1 className="navbar-brand">DANH MỤC PHÒNG</h1>
                                        <div className="form-inline">
                                            <Popup
                                                trigger={<button type="button" className="btn btn-primary"><i className="fa-solid fa-plus"></i> Add a room</button>}
                                                modal
                                                nested
                                            >
                                                {close => (
                                                    <>
                                                        <AddRoomForm roomCategories={roomCategories} close={close} setOnAdd={setOnAdd}/>
                                                    </>
                                                )}
                                            </Popup>
                                            {/* <div className="input-group">
                                                <input className="form-control bg-white border-1" type="search" placeholder="Search" />
                                                <input type="checkbox" className="btn-check" id="btn-check-outlined" autoComplete="off" />
                                                <label className="btn btn-outline-primary" htmlFor="btn-check-outlined"> <i className="fas fa-search fa-sm" /></label>
                                            </div> */}
                                        </div>
                                    </nav>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {
                                            rooms.map((room, index) =>
                                                <>
                                                    <CateRow room={room} roomCategories={roomCategories} />
                                                </>
                                            )
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
