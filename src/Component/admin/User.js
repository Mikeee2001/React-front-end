import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

function User() {
  const [user, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  const fetchData = () => {
    axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`
      }
    }).then((response) => {
      setUsers(response.data.users);
      setUserCount(response.data.users.length);
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="col-xl-4 col-md-6">
      <div className="card bg-warning text-white mb-4">
        <div className="card-body">
          <FontAwesomeIcon icon={faUser} size="3x" className="float-left mr-4" />
          <div className="h4">Users</div>
          <div className="h2">{userCount}</div>
        </div>
        <div className="card-footer d-flex align-items-center justify-content-between">
          <Link className="small text-white stretched-link" to="/admin/users">
            View Details
          </Link>
          <div className="small text-white">
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
