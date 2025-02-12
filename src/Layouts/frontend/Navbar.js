import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Logo from '../../Image/logo.jpg';

function Navbar() {
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

    const AuthButtons = !localStorage.getItem('auth_token') ? (
        <>
            <li className="nav-item">
                <Link className="nav-link text-dark" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-dark" to="/register">Register</Link>
            </li>
        </>
    ) : (
        <>
            <li className="nav-item">
                <Link className="nav-link text-dark" to="/appointments">Appointments</Link>
            </li>
            <li className="nav-item">
                <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-dark">Logout</button>
            </li>
        </>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow sticky-top" style={{ fontSize: "1.3rem" }}>
            <div className="container">
                <Link className="navbar-brand text-dark" to="/">
                    <img src={Logo} style={{ width: '50px', height: 'auto' }} className="logo" alt="Logo" />Healthcare Appointment System
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/">Home</Link>
                        </li>
                        {AuthButtons}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
