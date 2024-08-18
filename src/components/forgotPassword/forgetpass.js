import { Button, CircularProgress, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { backend_url } from "../../services/backendUrl";
import PositionedSnackbar from "../snackbar";

function ForgetPass() {
  const [progressbar, setProgressBar] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  const [resetPage, setResetPage] = useState(false);

  const navigate = useNavigate();

  const initialSnackState = {
    open: false,
    msg: "default",
    severity: "error",
    vertical: "top",
    horizontal: "center",
    withCircularProgress: false,
  };
  const [snackState, setSnackState] = useState(initialSnackState);

  const verifyEmail = async () => {
    if (data.email === "")
      setSnackState({ ...snackState, open: true, msg: "email field empty" });
    else {
      setProgressBar(true);
      let verifyEmailUrl = backend_url + "buyer/api/verifyEmail";
      const response = await fetch(verifyEmailUrl, {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const resp_data = await response.json();
      setProgressBar(false);
      if (resp_data.message === "verified") {
        setSnackState({
          ...snackState,
          open: true,
          msg: resp_data.message,
          severity: "success",
        });
        setResetPage(true);
      } else {
        setSnackState({ ...snackState, open: true, msg: resp_data.message });
      }
    }
  };

  const resetPassword = async () => {
    if (data.password === "" || data.confirm === "empty") {
      setSnackState({
        ...snackState,
        open: true,
        msg: "some fileds are empty",
      });
    } else if (data.password !== data.confirm) {
      setSnackState({
        ...snackState,
        open: true,
        msg: "password and confirm password doesnot match",
      });
    } else {
      setProgressBar(true);
      let resetUrl = backend_url + "buyer/api/resetPassword";
      const response = await fetch(resetUrl, {
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const resp_data = await response.json();
      setProgressBar(false);
      if (resp_data.message === "password reset successful") {
        setSnackState({
          ...snackState,
          open: true,
          msg: resp_data.message,
          severity: "success",
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <PositionedSnackbar
        snackState={snackState}
        setSnackState={setSnackState}
      />

      <div
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignSelf: "baseline",
          outline: "2px solid black",
          marginTop: "2vh",
          width: "50vw",
        }}
      >
        {progressbar && <CircularProgress />}
        <p style={{ fontSize: "1.3rem" }}>Forgot Password</p>
        <div>
          <Typography>Registered Email :</Typography>
          <Input
            type="email"
            placeholder="email"
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
        </div>

        {resetPage && (
          <div>
            <Typography>New Password :</Typography>
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
          </div>
        )}
        {resetPage && (
          <div>
            <Typography>Confirm Password :</Typography>
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => {
                setData({ ...data, confirm: e.target.value });
              }}
            />
          </div>
        )}
        {!resetPage && (
          <div>
            <Button variant="contained" width={10} onClick={verifyEmail}>
              Verify
            </Button>
          </div>
        )}
        {resetPage && (
          <div>
            <Button variant="contained" width={10} onClick={resetPassword}>
              Reset Password
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgetPass;
