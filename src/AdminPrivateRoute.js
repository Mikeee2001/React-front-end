import React, { useEffect, useState } from "react";
import { Route, Redirect, useHistory } from 'react-router-dom';
import MasterLayout from "./Layouts/admin/MasterLayout";
import axios from "axios";
import swal from "sweetalert";

function AdminPrivateRoute({ ...rest }) {

    const history = useHistory();
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/checkingAuthenticated').then(res => {
            if (res.status === 200) {
               setAuthenticated(true);
            }
            setLoading(false);
        });

        return () => {
            setAuthenticated(false);
        };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptors(err) {

        if (err.response.status === 401) 
           
        {
            swal("Unauthorized", err.response.data.message, "warning");
            history.push("/");
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response)
        {
            return response;
        }, function (error) {
            if(error.response.status === 403) //403 error Access Denied
                {
                    swal("FORBIDDEN",error.response.data.message, "warning");
                    history.push('/403');
                } 
                else if(error.response.status === 404) //404 error Page not found
                {
                    swal("404 Error", "Page Not Found", "warning");
                    history.push('/404');
                }
                 return Promise.reject(error);
        }
    );

    if (loading) {

        return (
            <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div
              className="spinner-border text-info"
              style={{ width: "4rem", height: "4rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        );
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                Authenticated ? (
                    <MasterLayout />
                ) : (
                    <Redirect to={{ pathname: "/login", state: { from: location } }} />
                )
            }
        />
    );
}

export default AdminPrivateRoute;
