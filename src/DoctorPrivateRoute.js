import React, { useEffect, useState } from "react";
import { Route, Redirect, useHistory } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";

import './styles/index.css';

import DoctorLayout from "../src/Layouts/doctor/DoctorLayout";

function DoctorPrivateRoute({ ...rest }) {


    const history = useHistory();
    const [DoctorAuthenticated, setDoctorAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get('/api/checkingAuthenticatedDoctor').then(res => {
            if (res.status === 200) {
                setDoctorAuthenticated(true);
            }
            setLoading(false);
        });

        return () => {
            setDoctorAuthenticated(false);
        };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptors(err) {

        if (err.response.status === 401) {
            swal("Unauthorized", err.response.data.message, "warning");
            history.push("/");
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 403) //403 error Access Denied
        {
            swal("FORBIDDEN", error.response.data.message, "warning");
            history.push('/403');
        }
        else if (error.response.status === 404) //404 error Page not found
        {
            swal("404 Error", "Page Not Found", "warning");
            history.push('/404');
        }
        return Promise.reject(error);
    }
    );

    if (loading) {

        return (
            <div >
                <div
                    className="spinner-border text-info"
                    role="status"
                >
                    <span className="loader"></span>            
                    </div>
            </div>
        );
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                DoctorAuthenticated ? (
                    <DoctorLayout />
                ) : (
                    <Redirect to={{ pathname: "/login", state: { from: location } }} />
                )
            }
        />
    );
}

export default DoctorPrivateRoute;
