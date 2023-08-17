import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";

import Radio from "@mui/material/Radio";
import { useNavigate } from "react-router";
import LinearDeterminate from "../progressbar";
import { maxHeight } from "@mui/system";
import PositionedSnackbar from "../snackbar";
import { backend_url } from "../../backendUrl";

function Login({ setLoginRole }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "Customer",
  });
  const [snackState, setSnackState] = useState({
    open: false,
    msg: "default",
    severity: "error",
    vertical: "top",
    horizontal: "center",
  });

  const [progressBar, setProgressBar] = useState(false);

  const navigate = useNavigate();

  var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  const handleLogin = async (e) => {
    setProgressBar(true);

    if (data.email === "" || data.password === "") {
      setSnackState({
        ...snackState,
        open: true,
        msg: "please enter data",
        severity: "info",
      });
    } else if (!pattern.test(data.email)) {
      setSnackState({ ...snackState, open: true, msg: "enter valid email" });
    } else {
      let url = backend_url;
      if (data.role === "Customer") url += "buyer/api/login";
      else url += "seller/api/login";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const resp_data = await response.json();
      if (resp_data.message === "logged in successfuly") {
        localStorage.setItem("token", resp_data.token);
        localStorage.setItem("role", data.role);
        setLoginRole({ isLoggedIn: true, role: data.role });
        setProgressBar(false);
        navigate("/products", { replace: true });
      } else {
        setSnackState({
          ...snackState,
          open: true,
          msg: resp_data.message,
          severity: "error",
        });
      }
      console.log(resp_data);
    }
    setProgressBar(false);
  };

  const handleChange = (e) => {
    setData({ ...data, role: e.target.value });
  };

  useEffect(() => {}, [snackState]);
  return (
    <div style={{ height: "100vh", display: "flex", flexFlow: "column" }}>
      <div>{progressBar && <LinearDeterminate sx={{ height: "5%" }} />}</div>
      <PositionedSnackbar
        snackState={snackState}
        setSnackState={setSnackState}
      />
      <Grid container display="flex" style={{ height: "100%", width: "100%" }}>
        <Grid
          item
          sx={{ display: { xs: "none", sm: "block" } }}
          sm={8}
          md={8}
          bgcolor="white"
          color={"white"}
        >
          <img
            src={
              "https://i0.wp.com/techstory.in/wp-content/uploads/2019/12/Ecom-Express.jpg?ssl=1"
            }
            style={{ height: "100%", width: "100%" }}
            placeholder="Img"
          ></img>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          display="flex"
          style={{ justifyContent: "center" }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              width: "80%",
              height: "100%",
            }}
          >
            <h1>Login</h1>

            <TextField
              required
              id="outlined-required"
              label="Email"
              type={"email"}
              defaultValue=""
              margin="normal"
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
            <TextField
              required
              type={"password"}
              id="outlined-required"
              label="Password"
              defaultValue=""
              margin="normal"
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
            <span>Customer</span>
            <Radio
              checked={data.role === "Customer"}
              onChange={handleChange}
              value="Customer"
              name="radio-buttons"
              inputProps={{ "aria-label": "Customer" }}
            />
            <span>Admin</span>
            <Radio
              checked={data.role === "Admin"}
              onChange={handleChange}
              value="Admin"
              name="radio-buttons"
              inputProps={{ "aria-label": "Admin" }}
            />
            <Button
              variant="contained"
              disableElevation
              margin="normal"
              style={{ marginTop: "15%" }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <Grid container>
              <Grid item xs={6}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    navigate("/forgotPassword");
                  }}
                >
                  Forgot Password
                </Link>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
