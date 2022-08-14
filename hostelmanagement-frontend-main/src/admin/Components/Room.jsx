import React, { useState } from "react";
import Popup from "reactjs-popup";
import CheckOut from "./CheckOut";
import Detail from "./Detail";

export default function Room({ room }) {

  const [onCheckOut, setOnCheckOut] = useState(true);

  function colorStatus(status) {
    switch (status) {
      case "Unvaliable":
        return "overlay-unvalid";
      case "Waiting":
        return "overlay-booking";
      case "Valiable":
        return "overlay-valid";
      default:
    }
  }
  return (
    <>
      <div className="col-4 mt-3 col-lg-3">
        <div className="card swiper-slide card-try-2 shadow border-0">
          <div className="image-content">
            <span className={colorStatus(room.roomStatus.name)} />
            <div className="card-image">
              <p className="text-center fs-5 mt-2">
                {" "}
                <strong>{room.name || null}</strong>
              </p>
            </div>
          </div>
          <div className="card-content">
            <label htmlFor="exampleInputText" className=" mb-0 mt-2 p-1 fs-5">
              {room.roomCategory.name || null}
            </label>
          </div>
          <div className="card-footer bg-white border-0 mb-4 p-2 text-center ">
            {
              (room.roomStatus.name === 'Unvaliable') && (
                <>
                  {/* Detail popup*/}
                  <button type="button" className="click-face-cpn-booking" data-bs-toggle="modal" data-bs-target={`#detailpopup${room.id}`}>Detail</button>

                  <div className="modal fade" id={`detailpopup${room.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fullscreen">
                      <div className="modal-content">
                        <Detail room={room} type={room.roomCategory} />
                      </div>
                    </div>
                  </div>
                  {/*End Detail popup*/}
                  {" "}

                  {/* Check out popup*/}
                  <button type="button" className="click-face-cpn-booking" data-bs-toggle="modal" data-bs-target={`#checkoutpopup${room.id}`}>Check Out</button>

                  <div className="modal fade" id={`checkoutpopup${room.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fullscreen">
                      <div className="modal-content">
                        <CheckOut room={room} setOnCheckOut={setOnCheckOut} onCheckOut={onCheckOut} />
                      </div>
                    </div>
                  </div>
                  {/*Check out popup*/}
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}
