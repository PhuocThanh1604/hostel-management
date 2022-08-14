import React, { useContext } from 'react'
import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';
import Footer from '../Components/Footer';
import Nav from '../Components/Nav';

export default function Customer({ googleLogin }) {
    return (
        <>
            <div className='customer'>
                <Nav googleLogin={googleLogin} />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}
