import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

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
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </>
    ) : (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/appointments">Appointments</Link>
            </li>
            <li className="nav-item">
                <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
            </li>
        </>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top" style={{fontSize: "1.0rem"}}>
            <div className="container">
                <Link className="navbar-brand" to="/">Healthcare Appointment System</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {AuthButtons}
                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
