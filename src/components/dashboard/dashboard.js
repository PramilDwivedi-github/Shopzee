import React, { useContext } from "react";

import Header from "./header";
import { Outlet } from "react-router-dom";

import { AppContext } from "../../App";

function Dashboard() {
  const {
    login_role,
    currentPage,
    setCurrentPage,
    setLoginRole,
    progressBar,
    setProgressBar,
  } = useContext(AppContext);

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
      // setCurrentPage={setCurrentPage}
      // setLoginRole={setLoginRole}
      // currentPage={currentPage}
      // login_role={login_role}
      // progressBar={progressBar}
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
