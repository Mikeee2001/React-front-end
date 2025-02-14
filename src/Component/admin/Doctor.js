import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Doctor() {
  return (
    <div className="card bg-primary text-white mb-4">
      <div className="card-body">
        <FontAwesomeIcon icon={faUserDoctor} size="3x" className="float-left mr-4" />
        <div className="h4">Doctors</div>
        <div className="h2">10</div>
      </div>
      <div className="card-footer d-flex align-items-center justify-content-between">
        <Link className="small text-white stretched-link" to="/admin/doctors">
          View Details
        </Link>
        <div className="small text-white">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </div>
  );
}

export default Doctor;
