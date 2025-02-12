import React from "react";

import { Link } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Patients() {
    return (
        <div className="col-xl-4 col-md-6" >
          <div className="card bg-success text-white mb-4">
            <div className="card-body">
              <FontAwesomeIcon icon={faUsers} size="3x" className="float-left mr-4" />
              <div className="h4">Patients</div>
              <div className="h2">100</div>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link className="small text-white stretched-link" to="/admin/patients">
                View Details
              </Link>
              <div className="small text-white">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </div>
          </div>
        </div>

    )
}
export default Patients;