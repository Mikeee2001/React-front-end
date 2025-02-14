import React from "react";
import User from "../admin/User";
import Doctor from "../admin/Doctor";
import Patients from '../admin/Patient';


function Dashboard() {
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Dashboard</h1>
      <div className="row">
        <div className="col-xl-4 col-md-6 mb-4">
          <User />
        </div>
        <div className="col-xl-4 col-md-6 mb-4">
          <Doctor />
        </div>
        <div className="col-xl-4 col-md-6 mb-4">
          <Patients />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
