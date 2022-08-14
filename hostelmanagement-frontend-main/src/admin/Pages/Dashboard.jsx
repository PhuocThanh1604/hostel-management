import React, { useEffect, useState } from 'react'
import instance from '../../axios';
import Option from '../Components/Option';
import RoomList from '../Components/RoomList';

export default function Dashboard() {
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterRoom, setFilterRoom] = useState(null);

  const handleFilterStatus = (e) => {
    if (e.target.value === "All") {
      setFilterStatus(null);
    } else {
      setFilterStatus(e.target.value)
    }
  }

  const handleRoomNumber = (e) => {
    if (e.target.value.toString().toLowerCase() === "") {
      setFilterRoom(null);
    } else {
      setFilterRoom(e.target.value.toString().toLowerCase())
    }
  }

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    instance.get("/room/all").then((response) => {
      setRooms(response.data)
      console.log(response)
    })
  }, [setRooms])

  return (
    <>
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="mt-3 col-sm-3 col-12">
            <h1>Rooms</h1>
          </div>
          <Option filterStatus={filterStatus} filterRoom={filterRoom} handleFilterStatus={handleFilterStatus} handleRoomNumber={handleRoomNumber} />
          <div className="container p-lg-2">
            <div className="row mt-5">
              <RoomList rooms={rooms} filterStatus={filterStatus} filterRoom={filterRoom} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
