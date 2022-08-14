import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import instance from '../../axios';
import { durationOverTime, today } from '../../Util/DateTime';
import { moneyFormat } from '../../Util/Money';
import { checkOutSurcharge, thisMoment } from '../../Util/Total';
import { useReactToPrint } from 'react-to-print';
import { Print } from './Print';

export default function CheckOut({ room, onCheckOut, setOnCheckOut }) {

  const [info, setInfo] = useState({});
  const [overTime, setOverTime] = useState(0);
  const [surcharge, setSurcharge] = useState({})
  const [mustPay, setMustPay] = useState(0)
  const [total, setTotal] = useState(0);
  const [error, setError] = useState({});
  const [prepaymentMore, setPrepaymentMore] = useState(0)
  const [change, setChange] = useState(0)
  const [onCheck, setOnCheck] = useState(false)
  const [advance, setAdvance] = useState(0);
  const componentRef = useRef()
  const close = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    instance.get(`/checkout/information/room/${room.id}`).then((response) => {
      if (response.status === 200) {
        let data = response.data;
        console.log("check out", data)
        setInfo(data);

        /* Overtime */
        if (moment(thisMoment).isSameOrAfter(`${data.check_out_time} 12:00`)) {
          setOverTime((durationOverTime(data.check_out_time))._milliseconds / (60000))
        } else {
          setOverTime(0)
        }

        /*Set surcharge */
        setSurcharge(checkOutSurcharge(data.roomcate_price, data.check_out_time));

        /*Set must pay = must pay +  surcharge*/
        setMustPay((data.total_room - data.prepayment) + checkOutSurcharge(data.roomcate_price, data.check_out_time).surcharge)

        /*Set total = mustpay + prepayment + surcharge*/
        setTotal(
          data.total_room + checkOutSurcharge(data.roomcate_price, data.check_out_time).surcharge
        )

      }
    })
  }, [setInfo])


  const handlePrepaymentMore = (e) => {
    setAdvance(e.target.value)
    const changeMoney = parseFloat(e.target.value) - mustPay;
    if ((parseFloat(e.target.value) < mustPay) || (e.target.value === "")) {
      setError({ prepaymentMore: "Not enough" })
      setPrepaymentMore(0)
      setChange(0)
      setOnCheck(false)
    }
    else {
      setChange(changeMoney)
      setOnCheck(true)
      setPrepaymentMore(parseFloat(e.target.value) - changeMoney)
      setError({})
    }
  }

  const handleCheckOut = () => {

    const checkOutData = {
      prepayment: prepaymentMore,
      surcharge: surcharge.surcharge,
      total_room: total,
    }

    instance.put(`/checkout/booking/${info.id}/room/${room.id}`, checkOutData).then((response) => {
      console.log("check outtttt", response)
      if (response.status === 200) {
        toast.success(`Check out successfully!`, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        close.current.click();
        window.location.reload();
      }
    })
  }

  return (
    <>
      <div className="card p-1 border-0">
        <div className="modal-header">
          <h5 className="modal-title">Check out - {room.name} </h5>
          <button type="button" ref={close} className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          <div style={{ display: 'none' }}><Print ref={componentRef} room={room} info={info} surcharge={surcharge.surcharge + info.surcharge} total={total} subtotal={mustPay} change={change} advance={advance} /></div>
          <div className="row input-group">
            <div className='col-12 text-end mb-3'>
              <button onClick={handlePrint} className="btn btn-primary">Print</button>
            </div>
            <div className='col-7'>
              <div className="container">
                <div className='row'>
                  <div className='card'>
                    <div className='row card-body'>
                      <h5 class="card-title mb-3">Expected</h5>
                      <div className='col-6'>
                        <label className="form-label"  >
                          Check In{" "}
                          <i className="far fa-clock" />
                        </label>
                        <br />
                        <input
                          type="text"
                          className="date form-control"
                          name="date"
                          disabled
                          value={info.check_in_time + " 12:00"}
                        />
                      </div>

                      <div className='col-6'>
                        <label className="form-label"  >
                          Check Out{" "}
                          <i className="far fa-clock" />
                        </label>
                        <br />
                        <input
                          type="text"
                          className="date  form-control"
                          name="date"
                          disabled
                          value={info.check_out_time + " 12:00"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='card mt-3'>
                    <div className='row card-body'>
                      <h5 class="card-title mb-3">Accepted</h5>
                      <div className='col-6'>
                        <label className="form-label"  >
                          Check In{" "}
                          <i className="far fa-clock" />
                        </label>
                        <br />
                        <input
                          type="text"
                          className="date  form-control"
                          name="date"
                          disabled
                          value={info.check_in_time + " 12:00"}
                        />
                      </div>

                      <div className='col-6'>
                        <label className="form-label"  >
                          Check Out{" "}
                          <i className="far fa-clock" />
                        </label>
                        <br />
                        <input
                          type="text"
                          className="date  form-control"
                          name="date"
                          disabled
                          value={thisMoment}
                        />
                      </div>

                      <div className='col-6 mt-3'>
                        <label className="form-label"  >
                          Over {""}
                          <i className="far fa-clock" />
                        </label>
                        <input
                          type="text"
                          className="form-control border border-danger text-danger"
                          disabled
                          value={overTime + " minutes"}
                        />
                      </div>

                      <div className='col-6 mt-3'>
                        <label className="form-label"  >
                          Surcharge {surcharge.percent + "%"}
                        </label>
                        <input
                          type="text"
                          className="form-control "
                          disabled
                          value={moneyFormat(surcharge.surcharge || 0)}
                        />
                      </div>

                      <div className='col-6 mt-3'>
                        <label className="form-label"  >
                          Paid{" "}
                          <i className="far fa-clock" />
                        </label>
                        <input
                          type="text"
                          className="form-control "
                          disabled
                          value={moneyFormat(info.prepayment || 0)}
                        />
                      </div>

                      <div className='col-6 mt-3'>
                        <label className="form-label"  >
                          Must Pay {""}
                          <i className="far fa-clock" />
                        </label>
                        <input
                          type="text"
                          className="form-control "
                          disabled
                          value={moneyFormat(mustPay)}
                        />
                      </div>

                      <div className="col-6 mb-3 mt-3 text-start">
                        <label
                          className="form-label text-success"
                        >
                          Cash advance <i className="far fa-money-bill-alt" />
                        </label>
                        <input
                          type="nubmer"
                          className="form-control border-success border-2"
                          onChange={handlePrepaymentMore}
                        />
                        {error.prepaymentMore && <span className='text-danger mt-3'>{error.prepaymentMore}</span>}
                      </div>

                      <div className="col-6 mb-3 mt-3 text-start">
                        <label
                          className="form-label text-warning"
                        >
                          Change  <i className="far fa-money-bill-alt" />
                        </label>
                        <input
                          type="nubmer"
                          className="form-control border border-warning border-2"
                          disabled
                          value={change}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-5'>
              <div className="card container">
                <div className="card-body">
                  <div className="mt-2">
                    <label
                      className="form-label" >
                      <h5>
                        Customer's Info{" "}
                        <i className="far fa-question-circle" />
                      </h5>
                    </label>
                  </div>

                  <div className='row'>
                    <div className='col-6 mb-2'>
                      <label className="form-label" >
                        Full Name{" "}
                        <i className="far fa-user" />
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        disabled
                        value={info.full_name}
                      />
                    </div>

                    <div className='col-6'>
                      <label className="form-label" >
                        ID card{" "}
                        <i className="far fa-user" />
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        disabled
                        value={info.card_number}
                      />
                    </div>
                    <div className='col-6'>
                      <label className="form-label" >
                        Email{" "}
                        <i className="far fa-user" />
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        disabled
                        value={info.email}
                      />
                    </div>
                    <div className='col-6'>
                      <label className="form-label" >
                        Phone{" "}
                        <i className="far fa-user" />
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        disabled
                        value={info.phone}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card container mt-3">
                <div className="card-body">
                  <div className="mt-2">
                    <label
                      className="form-label" >
                      <h5>
                        Room's Info{" "}
                        <i className="far fa-question-circle" />
                      </h5>
                    </label>
                  </div>

                  <div className='row'>
                    <div className='col-12 mb-2'>
                      <label className="form-label" >
                        Name{" "}
                        <i className="far fa-user" />
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        disabled
                        value={room.name}
                      />
                    </div>

                    <div className='col-7'>
                      <label className="form-label" >
                        Type of Room{" "}
                        <i className="far fa-user" />
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        disabled
                        value={room.roomCategory.name}
                      />
                    </div>

                    <div className='col-5'>
                      <label className="form-label" >
                        Price{" "}
                        <i className="far fa-user" />
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        disabled
                        value={moneyFormat(room.roomCategory.price)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='text-center'>
          {
            (moment(today).isSameOrAfter(`${info.check_out_time} `) && onCheck) ? (
              <>
                <button type="button" className="btn btn-primary btn-lg" style={{ width: '40%' }} onClick={handleCheckOut}>Check out</button>
              </>

            ) : (
              <>
                <button type="button" className="btn btn-primary btn-lg" style={{ width: '40%' }} disabled>Check out</button>
              </>
            )
          }

        </div>
      </div>
    </>
  )
}

