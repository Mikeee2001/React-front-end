import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS
import swal from "sweetalert";
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome CSS

const Navbar = () => {
    const history = useHistory();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('auth_role');
                swal("Success", res.data.message, "success");
                history.push("/");
            }
        });
    }

    const handleSidebarToggle = () => {
        document.body.classList.toggle("sb-sidenav-toggled");
    }

    const AuthButtons = !localStorage.getItem('auth_token') ? (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </>
    ) : (
        <>
            <li className="nav-item dropdown" style={{ fontSize: "2rem" }}>
                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fas fa-user fa-fw"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{ fontSize: "1rem" }}>
                    <li><a className="dropdown-item" href="#!">My Patients</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                        <button type="button" onClick={logoutSubmit} className="dropdown-item btn btn-outline-danger btn-sm">
                            Logout
                        </button>
                    </li>
                </ul>
            </li>
        </>
    );

    return (
        
                <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark" style={{ height: "70px", fontSize: "1.3rem" }}>
                    <Link className="navbar-brand ps-3" to="/doctor/dashboard" style={{ fontSize: "1.5rem" }}>Doctor Dashboard</Link>
                    <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" to="#!"></button>

                    <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" style={{ fontSize: "1.3rem" }} id="sidebarToggle" onClick={handleSidebarToggle}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="d-flex ms-auto align-items-center">
                        <form className="d-none d-md-inline-block form-inline me-3 my-2 my-md-0">
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                                <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                            </div>
                        </form>
                        <ul className="navbar-nav">
                            {AuthButtons}
                        </ul>
                    </div>
                </nav>
          
    );
}

export default Navbar;
