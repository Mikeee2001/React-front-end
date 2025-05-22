import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function User() {
  const [users, setUsers] = useState([]);
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
    <div className="card text-white mb-4 bg-custom text-center fw-bold">
      <div className="overlay"></div> {/* Transparent overlay */}
      <div className="card-body position-relative">
        <FontAwesomeIcon icon={faUser} size="3x" className="d-block mx-auto mb-3" /> {/* Center icon */}
        <div className="h4">Users</div>
        <div className="h2">{userCount}</div>
      </div>
      <div className="card-footer d-flex align-items-center justify-content-center position-relative">
        <Link className="small text-white stretched-link fw-bold" to="/admin/users">
          View Details
        </Link>
        <div className="small text-white ms-2">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </div>

  );
}

export default User;
