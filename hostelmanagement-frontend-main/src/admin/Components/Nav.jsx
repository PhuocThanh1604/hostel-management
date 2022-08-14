import React from 'react'

export default function Nav() {
    return (
        <header>
            {/* Navbar Start */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar static-top px-4 py-0 nav-font-main">
                <div className="navbar-nav align-items-center ms-auto">
                    <div className="nav-item dropdown ">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <i className="fa fa-bell me-lg-2" />
                            <span className="d-none d-lg-inline-flex">Notificatin</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-head-main border-0 rounded-bottom m-0">
                            <a href="#" className="dropdown-item">
                                <h6 className="fw-normal mb-0">Profile updated</h6>
                                <small className="text-secondary">15 minutes ago</small>
                            </a>
                            <hr className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <h6 className="fw-normal mb-0">New user added</h6>
                                <small className="text-secondary">15 minutes ago</small>
                            </a>
                            <hr className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                <h6 className="fw-normal mb-0">Password changed</h6>
                                <small className="text-secondary">15 minutes ago</small>
                            </a>
                            <hr className="dropdown-divider" />
                            <a href="#" className="dropdown-item text-center">See all notifications</a>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img className="UserMenu_avatar__BwHLQ_focus" src="https://static.fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" alt="Thinh Dao" aria-expanded="false" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-head-main border-0 rounded-bottom m-0 p-3 pe-2">
                            <img className="UserMenu_avatar__BwHLQ" src="https://static.fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" alt="Thinh Dao" aria-expanded="false" />
                            <span className="d-none d-lg-inline-flex">Thinh Dao</span>
                            <hr className="dropdown-divider" />
                            <a href="./profile.html" className="dropdown-item text-secondary">My Profile</a>
                            <a href="#" className="dropdown-item text-secondary">Settings</a>
                            <a href="#" className="dropdown-item text-secondary">Log Out</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    )
}
