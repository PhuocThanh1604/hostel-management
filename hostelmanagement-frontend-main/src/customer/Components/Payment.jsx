import React, { useState } from 'react'

export default function Payment({ next, prev, handlePayment, total }) {
    const [payment, setPayment] = useState(null);
    const [paypal, setPaypal] = useState(false)

    return (
        <>
            <div className="wow fadeInUp" data-wow-delay="0.2s">

                <div className="card w-100 form-check">
                    <div className='row'>
                        <div className='col-1'>
                            <input className="form-check-input ms-3 mt-5" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={() => setPayment(1)} />
                        </div>
                        <div className='col-11'>
                            <label className="card-body form-check-label ">
                                <h5 className="card-title">Pay at Counter</h5>
                                <p className="card-text">Please pay at counter in 24 hours after booking</p>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-3 card w-100  form-check  pb-3">
                    <div className='row'>
                        <div className='col-1'>
                            <input className="form-check-input ms-3 mt-5" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={() => setPayment(2)} />
                        </div>
                        <div className='col-11'>
                            <label className="card-body form-check-label ">
                                <h5 className="card-title">
                                    Pay Online with PayPal</h5>
                                <p className="card-text">Pay immediately with PayPal</p>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 mt-3 text-start">
                        <button className="btn btn-primary w-50 py-3 bg-secondary" type="button" onClick={prev}><i className="fa fa-angle-double-left" aria-hidden="true"></i></button>
                    </div>
                    <div className="col-6 mt-3 text-end">
                        <button className="btn btn-primary w-100 py-3" type="button"
                            disabled={payment ? false : true}
                            onClick={
                                (payment === 2) ?
                                    next :
                                    handlePayment
                            }
                        >THANH TOÁN</button>
                    </div>
                </div>
            </div>
        </>
    )
}
