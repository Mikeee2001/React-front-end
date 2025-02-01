import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import '../../admin/css/styles.css';
import '../../admin/js/scripts';

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import Routes from "../../Routes/routes";

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
                            {Routes.map((route, index) => (
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
                            <Redirect path="/admin"  to="/admin/dashboard"/>
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default MasterLayout;
