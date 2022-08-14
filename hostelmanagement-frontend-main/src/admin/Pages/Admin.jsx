import React from 'react'
import { Outlet} from "react-router-dom";
import Nav from '../Components/Nav';
import SideBar from '../Components/SideBar';

export default function Admin() {

  return (
    <>
      <div className="dashboard">
        <SideBar />
        <div class="dashboard-app">
          <Nav />
          <Outlet />
        </div>
      </div>
    </>
  )
}
