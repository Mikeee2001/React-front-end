import React from "react";

function Dashboard() {
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Dashboard</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Dashboard</li>
      </ol>
      <div className="card mb-4">
        <div className="card-body">
          Welcome to the Dashboard!
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
