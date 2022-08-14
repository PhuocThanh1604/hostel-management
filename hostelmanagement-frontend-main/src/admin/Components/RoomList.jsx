import React from "react";
import Room from "./Room";
export default function RoomList({ rooms, filterStatus, filterRoom }) {
  return (
    <>
      {
        rooms
          .filter(room => filterRoom ? (room.name === filterRoom.toString().toLowerCase()) : room)
          .filter(room => filterStatus ? (room.roomStatus.name === filterStatus) : room)
          .map((room, index) => (
            <Room
              room={room}
            />
          ))}
    </>
  );
}
