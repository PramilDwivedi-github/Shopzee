import { AppBar, Tabs, Toolbar, Tab, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material";
import Header from "./header";
import { Outlet } from "react-router-dom";
import { display, margin } from "@mui/system";

function Dashboard({ login_role, currentPage, setCurrentPage, setLoginRole }) {
  // const [currentPage, setCurrentPage] = useState("Products");
  // const [login_role, setLoginRole] = useState({
  //   isLoggedIn: false,
  //   role: "Customer",
  // });
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
        setCurrentPage={setCurrentPage}
        setLoginRole={setLoginRole}
        currentPage={currentPage}
        login_role={login_role}
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
        <Outlet context={{ login_role, currentPage, setCurrentPage }} />
      </div>
    </div>
  );
}

export default Dashboard;
