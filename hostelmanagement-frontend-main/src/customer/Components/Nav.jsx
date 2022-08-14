import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Nav({ googleLogin }) {

    const { user } = useContext(UserContext);

    const menu = [
        {
            item: "Home",
            link: "/"
        },
        {
            item: "Rooms",
            link: "/"
        },
        {
            item: "Contact",
            link: "/"
        },
    ]
    const handleLogout = () => {
        sessionStorage.removeItem("jwt");
        window.location.reload();
    }
    return (

        <>
            <div className="container-fluid container-fluid-header bg-dark px-0 nav-custom-user">
                <div className="row gx-0">
                    <div className="col-lg-3 bg-dark d-none d-lg-block">
                        <Link to="/" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                            <h1 className="m-0 text-primary text-uppercase">Hotelier</h1>
                        </Link>
                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
                            <Link to="/" className="navbar-brand d-block d-lg-none">
                                <h1 className="m-0 text-primary text-uppercase">Hotelier</h1>
                            </Link>
                            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">

                                    {
                                        menu.map((item, index) => {
                                            return (
                                                <Link to={item.link} className="nav-item nav-link">{item.item}</Link>
                                            )
                                        }
                                        )
                                    }
                                </div>

                                {
                                    user.profile ? (
                                        <>
                                            <div className="nav-item dropdown pe-5">
                                                <Link to="/profile" className="nav-link dropdown-toggle text-f-login my-dropdown-toggle " data-bs-toggle="dropdown">{user.profile.fullName}</Link>
                                                <div className="dropdown-menu dropdown-menu-chang">
                                                    <Link to="/purchase" className="dropdown-item text-secondary">Purchase</Link>
                                                    <Link to="/" onClick={handleLogout} className="dropdown-item text-secondary">Log out</Link>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <button className="btn btn-primary me-3" onClick={() => googleLogin()}>Sign In With Google</button>
                                    )
                                }
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
