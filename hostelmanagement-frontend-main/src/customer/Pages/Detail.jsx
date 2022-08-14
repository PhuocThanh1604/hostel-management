import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { moneyFormat } from '../../Util/Money';
import Loading from '../Components/Loading';

export default function Detail({ setLoginRequest }) {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState();
    const { pathname, state } = useLocation();
    let navigate = useNavigate();

    console.log(state)

    useEffect(() => {
        setLoading(false)
        window.scrollTo(0, 0);
        setDetail(state)
    }, [pathname]);

    const handleCheckOut = () => {
        navigate(`/checkout/${detail.id}`, { state: detail });
    }

    return (
        <>
            {loading && <Loading />}
            {detail && (
                <>
                    <div className="container-fluid bg-white">
                        <div className="container pt-5 bg-white">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <img src="https://templates.hibootstrap.com/atoli/default/assets/img/about/about-img2.png" className="w-100" alt />
                                </div>
                                <div className="col-lg-6">
                                    <div className="banner-another">
                                        <div className="text-center " data-wow-delay="0.1s">
                                            <h1 className="mb-4">Book A <span className="text-primary text-uppercase">{detail.name} Room</span></h1>
                                        </div>
                                        <label htmlFor="text" className="banner-another-des">
                                            {detail.description}
                                        </label>
                                        <div className="row">
                                            <div className="col-xl-3 text-center d-flex" data-aos="fade-up" data-aos-delay={100} data-aos-duration={1000}>
                                                <label className="shadow">
                                                    <div><i className="fa-thin fa-wifi" /></div>
                                                    <div className="text">
                                                        <label htmlFor="text">Coverage</label>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className="col-md-3 col-xl-3 text-center d-flex" data-aos="fade-up" data-aos-delay={100} data-aos-duration={1000}>
                                                <label className=" shadow">
                                                    <i className="fa-thin fa-bed-front " />
                                                    <label htmlFor="text"> Big bed</label>
                                                </label>
                                            </div>
                                            <div className="col-md-3 col-xl-3 text-center d-flex" data-aos="fade-up" data-aos-delay={100} data-aos-duration={1000}>
                                                <label className=" shadow">
                                                    <i className="fa-thin fa-vacuum " />
                                                    <div className="text">
                                                        <label htmlFor="text">Cleaning </label>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className="col-md-3 col-xl-3 text-center d-flex" data-aos="fade-up" data-aos-delay={100} data-aos-duration={1000}>
                                                <label className="shadow">
                                                    <i className="fa-thin fa-martini-glass-citrus" />
                                                    <div className="text">
                                                        <label htmlFor="text">Drink free</label>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="banner-btn text-center d-block ">
                                            <div>
                                                <label className="text-uppercase me-4" htmlFor="text">
                                                    {moneyFormat(detail.price)} <label htmlFor="text">/ ngày</label></label>
                                                <button type="button" className="btn text-uppercase" onClick={handleCheckOut}>
                                                    Book Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
