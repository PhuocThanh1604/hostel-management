import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {

    const menu = [

        {
            title: "Rooms",
            icon: "fa-brands fa-buromobelexperte",
            link: "/admin",
            sub: []
        },
        {
            title: "Booking",
            icon: "fa-solid fa-calendar-clock",
            link: "/admin/booking",
            sub: []
        },
        {
            title: "Setting",
            icon: "fa-solid fa-calendar-clock",
            link: "/admin/booking",
            sub: [
                {
                    title: "Add Room",
                    icon: "fa-solid fa-calendar-clock",
                    link: "/admin/rooms"
                },
                {
                    title: "Add Type",
                    icon: "fa-solid fa-calendar-clock",
                    link: "/admin/types"
                }
            ]
        },

    ]

    return (
        <>
            <div className="dashboard-nav">
                <header><a href="#!" className="menu-toggle"><i className="fas fa-bars" /></a><a href="./Home" className="brand-logo"><i className="fa-thin fa-house" /><span>MENU</span></a></header>
                <nav className="dashboard-nav-list">
                    {
                        menu.map((item, index) => (
                            <div className="dashboard-nav-dropdown" data-bs-toggle={(item.sub.length > 0) && "collapse"} data-bs-target={(item.sub.length > 0) && "#dashboard-collapse"} >
                                <Link to={item.link} className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                                    <i className={item.icon} />
                                    {item.title}
                                </Link>
                                {
                                    (item.sub.length > 0) && (
                                        <div className="collapse" id="dashboard-collapse" style={{}}>
                                            <ul className="btn-toggle-nav list-unstyled fw-normal ms-3">
                                                {item.sub.map((subitem, index) => (
                                                    <li>
                                                        <Link to={subitem.link} className="dashboard-nav-item">
                                                            <span><i className="fa-solid fa-rectangle-history-circle-plus"></i> {subitem.title}</span></Link>
                                                    </li>
                                                ))
                                                }
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                    <a href="" className="dashboard-nav-item" onClick={() => {
                        sessionStorage.removeItem("jwt");
                        window.location.reload();
                    }}><i className="fas fa-sign-out-alt me-2" /> Logout </a>
                </nav>
            </div>

        </>
    )
}
