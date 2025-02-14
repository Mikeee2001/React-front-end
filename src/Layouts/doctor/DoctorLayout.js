import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import '../../admin/css/styles.css';
import '../../admin/js/scripts';

import Navbar from "../doctor/Navbar";
import Sidebar from "../doctor/Sidebar";


import DoctorRoutes from "../../Routes/doctorRoutes";

const MasterLayout = () => {
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <Switch>
                            {DoctorRoutes.map((route, index) => (
                                route.component && (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        name = {route.name}
                                        render={props => (
                                            <route.component {...props} />
                                        )}

                                    />
                                )
                            ))}
                            <Redirect path="/doctor"  to="/doctor/dashboard"/>
                        </Switch>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default MasterLayout;
