import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import heartbeat from '../../Image/heartbeat.jpg'; // Custom CSS file

function Page403() {

    return (
        <div className="page403" style={{ backgroundImage: `url(${heartbeat})` }}>
            <div className="container vh-100 d-flex justify-content-center align-items-center page-403" >
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <div className="body">
                            <div className="card card-body shadow-lg p-5 transparent-box">
                                <h1 className="display-1 text-danger">403</h1>
                                <h2 className="display-5">Forbidden</h2>
                                <p className="lead">ACCESS DENIED!!! AS YOU ARE NOT AN ADMIN</p>
                                <a href="/" className="btn btn-primary mt-3">Go to Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page403;
