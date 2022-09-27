import { AppBar, Tabs, Toolbar, Tab, Typography, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material";
import Header from "./header";
import { Outlet } from "react-router-dom";
import { display, margin } from "@mui/system";
import LinearDeterminate from "../progressbar";
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
