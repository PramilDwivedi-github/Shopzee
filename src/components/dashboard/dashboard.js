import React from "react";

import Header from "./header";
import { Outlet } from "react-router-dom";


function Dashboard() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexFlow: "column",
      }}
    >
      <Header
      />
      <div
        className="Dashboard-Afer-Header"
        style={{
          height: "100%",
          width: "100%",
          // display: "flex",
          // flexFlow: "column",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
