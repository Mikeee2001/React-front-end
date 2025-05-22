import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair } from '@fortawesome/free-solid-svg-icons';

import '../../styles/index.css';

const Sidebar = () => {

    //set the login name to name of the admin
    const [ doctorName, setDoctorName ] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('auth_name');
        setDoctorName(name);
    }, []);

    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" style={{fontSize: "1.5rem"}}>
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <Link className="nav-link" to="/doctor">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" style={{fontSize: "2rem"}}></i></div>
                        Dashboard
                    </Link>
                    <Link className="nav-link" to="/doctor/patients">
                        <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faWheelchair} style={{fontSize: "2rem"}}/></div>
                        Patients
                    </Link>
                    {/* <Link className="nav-link" to="">
                        <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faUserDoctor} style={{fontSize: "2rem"}}/></div>
                        Doctors
                    </Link> */}
                    {/* <div className="sb-sidenav-menu-heading">Interface</div>
                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Total Income
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>                  */}
                </div>
            </div>

            <div className="sb-sidenav-footer">
                <div className="small">Log-in Doctor as:</div>
               {doctorName}
            </div>
        </nav>
    );
};

export default Sidebar;
