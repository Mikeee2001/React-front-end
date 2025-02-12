import React from "react";

import User from "../admin/User";
import Doctor from "../admin/Doctor";
import Patient from "../admin/Patient";


function dashboard() {
  return (
    < >
      <h1 className="mt-4">Dashboard</h1>
      <div className="container">

        <div className="row">
          <div className="col-4">

            <User />

          </div>
          <div className="col-4">

            <Doctor />

          </div>
          <div className="col-4">

            <Patient />

          </div>

        </div>

      </div>

    </>
  );
}

export default dashboard;
