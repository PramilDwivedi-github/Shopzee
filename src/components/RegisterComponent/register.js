import React, { useState } from "react";
import { useNavigate } from "react-router";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import PositionedSnackbar from "../snackbar";
import { CircularProgress } from "@mui/material";
import { backend_url } from "../../backendUrl";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    address: "",
  });

  const [role, setRole] = useState("Customer");

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

  const handleRegister = async () => {
    setProgressBar(true);
    let flag = true;
    for (let i in data) {
      if (data[i] === "") {
        setSnackState({ ...snackState, msg: "fill empty fileds", open: true });
        setProgressBar(false);
        flag = false;
        break;
      }
    }
    if (flag) {
      if (!pattern.test(data.email)) {
        setSnackState({ ...snackState, msg: "enter valid email", open: true });
        setProgressBar(false);
      } else if (data.phone.length !== 10) {
        setProgressBar(false);
        setSnackState({
          ...snackState,
          msg: "enter valid phone number",
          open: true,
        });
      } else if (data.password !== data.confirm) {
        setProgressBar(false);
        setSnackState({
          ...snackState,
          msg: "confirm password does'nt match",
          open: true,
        });
      } else {
        let url = backend_url;
        if (role === "Customer") url += "buyer/api/register";
        else url += "seller/api/register";
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const resp_data = await response.json();
        setProgressBar(false);
        if (
          resp_data.message === "User Registered Successfully" ||
          resp_data.message === "Registered successfuly"
        ) {
          setProgressBar(false);
          setSnackState({
            ...snackState,
            msg: resp_data.message,
            open: true,
            severity: "success",
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
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
    }
    setProgressBar(false);
  };

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "75%",
        marginLeft: "12%",
        alignSelf: "center",
        // flexFlow: "column",
      }}
    >
      {progressBar && <CircularProgress />}
      <PositionedSnackbar
        snackState={snackState}
        setSnackState={setSnackState}
      />
      <Grid
        container
        style={{
          display: "flex",
          width: "70vh",
          height: "90vh",
          justifyContent: "center",
          alignSelf: "center",
        }}
        columnSpacing={2}
      >
        <Grid item xs={12}>
          <h1>SignUp</h1>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-required"
            label="Name"
            defaultValue=""
            margin="normal"
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-required"
            label="Phone"
            defaultValue=""
            type={"number"}
            margin="normal"
            onChange={(e) => {
              setData({ ...data, phone: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-required"
            type={"email"}
            label="Email"
            fullWidth
            defaultValue=""
            margin="normal"
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-required"
            label="Password"
            type={"password"}
            defaultValue=""
            margin="normal"
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-required"
            label="Confirm Password"
            type={"password"}
            defaultValue=""
            margin="normal"
            onChange={(e) => {
              setData({ ...data, confirm: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-required"
            label="Address"
            fullWidth
            defaultValue=""
            margin="normal"
            onChange={(e) => {
              setData({ ...data, address: e.target.value });
            }}
          />
        </Grid>
        <span>Customer</span>
        <Radio
          checked={role === "Customer"}
          onChange={handleChange}
          value="Customer"
          name="radio-buttons"
          inputProps={{ "aria-label": "Customer" }}
        />
        <span>Admin</span>
        <Radio
          checked={role === "Admin"}
          onChange={handleChange}
          value="Admin"
          name="radio-buttons"
          inputProps={{ "aria-label": "Admin" }}
        />
        <Grid item xs={12}>
          <Button
            variant="contained"
            disableElevation
            margin="normal"
            size="large"
            style={{
              marginTop: "10%",
              justifySelf: "center",
              alignSelf: "center",
            }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Register;
