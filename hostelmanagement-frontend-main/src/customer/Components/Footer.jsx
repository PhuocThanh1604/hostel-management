import React from 'react'

export default function Footer() {
    return (
        <>
         <div className='container-fluid bg-dark text-light  wow fadeIn index-footer-container-fluid ' data-wow-delay='0.1s'>
            <div className='container '>
                <div className='row g-5'>
                    <div className='col-lg-6 ft-label'>
                        <label for='text' >
                            contact</label>
                        <h1  className='d-block'> <i className='fa-solid fa-location-dot mx-2 text-primary'></i> Lô
                            E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ,Quận 9, TP.HCM</h1>
                        <h1 className='d-block'><i className='fa-solid fa-envelope mx-2 text-primary'></i>teamSWP@fpt.edu.vn</h1>
                        <h1 className='d-block'><i className='fa-brands fa-facebook mx-2 text-primary'></i> chat with
                            us:https://www.facebook.com/</h1>
                        <h1 className='d-block'><i className='fa-solid fa-phone text-primary mx-2'></i>(+84) 564 565 562 - (+84) 952
                            482 920</h1>
                    </div>
                    <div className='col-sm-12 col-lg-6 text-center'>
                        <div className='ps-2 pt-4'>
                            <small className='fa fa-star '></small>
                            <small className='fa fa-star '></small>
                            <small className='fa fa-star'></small>
                            <small className='fa fa-star '></small>
                            <small className='fa fa-star'></small>
                        </div>
                        <label for='text' className='fs-1 text-uppercase'>
                            Hotelier</label>
                        <label for='text' className='d-block text-uppercase'>hotel
                            § Luxury</label>
                    </div>

                </div>
            </div>
        </div>

        </>
    )
}
