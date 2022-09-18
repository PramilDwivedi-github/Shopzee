import {
  AppBar,
  Tabs,
  Toolbar,
  Tab,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TemporaryDrawer from "./DrawerComp";
import { useNavigate } from "react-router";

function Header({ setCurrentPage, login_role, setLoginRole, currentPage }) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoginRole({ isLoggedIn: false, role: "Customer" });
  };

  useEffect(() => {
    if (currentPage === "Cart") setValue(1);
    else if (currentPage === "Products") setValue(0);
    else if (currentPage === "Orders") setValue(2);
  }, [currentPage]);
  return (
    <div style={{ height: "12vh" }}>
      <AppBar>
        <Toolbar>
          {isMatch ? (
            <>
              <TemporaryDrawer
                login_role={login_role}
                handleLogout={handleLogout}
              />
              <Typography>Shopzee</Typography>
              <ShoppingCartIcon />
            </>
          ) : (
            <>
              <Typography>Shopzee</Typography>
              <ShoppingCartIcon />
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, value) => {
                  setValue(value);
                  switch (value) {
                    case 0:
                      navigate("/products");
                      setCurrentPage("Products");
                      break;
                    case 1:
                      navigate("/cart");
                      setCurrentPage("Cart");
                      break;
                    case 2:
                      console.log(value);
                      if (login_role.role === "Admin") {
                        setCurrentPage("addProduct");
                        navigate("/addProduct");
                      } else {
                        setCurrentPage("Orders");
                        navigate("/orders");
                      }
                      break;
                    case 3:
                      setCurrentPage("addProduct");
                      console.log(value);
                      navigate("/addProduct");
                  }
                }}
                indicatorColor="secondary"
              >
                <Tab label="Products" />
                {login_role.role === "Customer" && <Tab label="Cart" />}
                <Tab label="Orders" />
                {login_role.role === "Admin" && <Tab label="AddProducts" />}
              </Tabs>

              {!login_role.isLoggedIn && (
                <Button
                  variant="contained"
                  sx={{ marginLeft: "auto" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
              {!login_role.isLoggedIn && (
                <Button
                  variant="contained"
                  sx={{ marginLeft: "15px" }}
                  onClick={() => navigate("/register")}
                >
                  SignUp
                </Button>
              )}
              {login_role.isLoggedIn && (
                <Button variant="contained" onClick={handleLogout}>
                  Logout
                </Button>
              )}
              {login_role.isLoggedIn && <Avatar alt="Remy Sharp" src="" />}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
