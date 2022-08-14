import React from 'react'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'

export default function PopupLogin({closeModalLoginRequest, loginRequest, googleLogin}) {
    return (
        <>
            <Popup open={loginRequest} closeOnDocumentClick onClose={closeModalLoginRequest}>
                <div className="modal-dialog modal-sm">
                    <div className="modal-content modal-content-next-gg border-0">
                        <div className="modal-header border-0">
                            <a className="close btn-close" onClick={closeModalLoginRequest}>
                            </a>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <div className="card mb-4 border-0 bsh-card-gg ">
                                        <div className=" text-center img-modal-next-gg">
                                            <img src="" className="img-modal-main" alt="" />
                                        </div>
                                        <div className="card-body text-center">
                                            <label className="card-title pricing-card-title text-uppercase pricing-card-title-txt" htmlFor="text">LOGIN</label>
                                            <label htmlFor="text" className="text-muted mt-1">Login for the new and discover the latest arrivals.</label>
                                            <button className="btn btn-primary mt-3" onClick={() => googleLogin()}>Sign In With Google</button>
                                            <div className="mt-3">
                                                <Link to="/" className="fs-6 modal-last-out"><small>Maybe
                                                    Latter</small></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}
