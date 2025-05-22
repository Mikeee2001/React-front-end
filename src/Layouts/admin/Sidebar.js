import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';

import '../../styles/index.css';

const Sidebar = () => {

    //set the login name to name of the admin
    const [ adminName, setAdminName ] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('auth_name');
        setAdminName(name);
    }, []);

    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" style={{fontSize: "1.5rem"}}>
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <Link className="nav-link" to="/admin/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" style={{fontSize: "2rem"}}></i></div>
                        Dashboard
                    </Link>
                    <Link className="nav-link" to="/admin/users">
                        <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faUsers} style={{fontSize: "2rem"}}/></div>
                        Users
                    </Link>
                    <Link className="nav-link" to="/admin/profile">
                        <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faUserDoctor} style={{fontSize: "2rem"}}/></div>
                        Doctors
                    </Link>           
                
                </div>
            </div>

            <div className="sb-sidenav-footer">
                <div className="small">Logged in Admin as:</div>
               {adminName}
            </div>
        </nav>
    );
};

export default Sidebar;
