import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CardMedia,
  Grid,
  Input,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { backend_url } from "../../backendUrl";
import { AppContext } from "../../App";
import PositionedSnackbar from "../snackbar";

function Profile() {
  const { login_role, setProgressBar } = useContext(AppContext);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const initialSnackState = {
    open: false,
    msg: "default",
    severity: "error",
    vertical: "top",
    horizontal: "center",
    withCircularProgress: false,
  };
  const [snackState, setSnackState] = useState(initialSnackState);
  const [editImg, setEditImg] = useState(false);
  const [userImage, setUserImage] = useState("");

  const [user, setUser] = useState({});

  const convertBase64 = (e) => {
    let files = e.target.files;
    let file = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUserImage(reader.result);
    };
  };

  const getuser = async () => {
    setProgressBar(true);
    let user_url = backend_url;

    if (login_role.role === "Customer") user_url += "buyer/api/data";
    else user_url += "seller/api/data";
    const response = await fetch(user_url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const resp_data = await response.json();
    setProgressBar(false);
    if (resp_data.message === "success") {
      setUser({
        ...resp_data.data,
      });
      if (resp_data.img) setUserImage(resp_data.img.img);
    } else {
      setSnackState({ ...snackState, open: true, msg: resp_data.message });
    }
  };

  const uploadImage = async () => {
    if (userImage === "") {
      setSnackState({
        ...snackState,
        open: true,
        msg: "cannot upload empty image",
      });
    } else {
      setProgressBar(true);
      let image_url = backend_url;
      if (login_role.role === "Customer") image_url += "buyer/api/profileImage";
      else image_url += "seller/api/profileImage";

      const response = await fetch(image_url, {
        method: "POST",
        body: JSON.stringify({ userImage }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const resp_data = await response.json();
      setProgressBar(false);
      if (
        resp_data.message === "Upload Successfull" ||
        resp_data.message === "Updated"
      ) {
        setSnackState({
          ...snackState,
          open: true,
          msg: resp_data.message,
          severity: "success",
        });
      } else {
        setSnackState({ ...snackState, msg: resp_data.message, open: true });
      }
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  return (
    <div
      className="OrderDetail"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: "5vh",
      }}
    >
      <PositionedSnackbar
        setSnackState={setSnackState}
        snackState={snackState}
      ></PositionedSnackbar>
      {/* <div style={{ alignSelf: "center" }}>
        <Avatar
          alt={"PD"}
          src="https://wallpapercave.com/wp/wp7900881.jpg"
          sx={{ height: 200, width: 250 }}
        ></Avatar>
      </div> */}

      <div style={{ fontSize: isMatch ? "1.4rem" : "1rem" }}>
        <Grid container sx={{ width: "100%", alignSelf: "baseline" }}>
          <Grid item xs={12} style={{ marginLeft: isMatch ? "20vw" : "40vw" }}>
            <CardMedia>
              <Avatar
                alt={"PD"}
                src={userImage}
                sx={{ height: 200, width: 250 }}
              ></Avatar>
            </CardMedia>

            {!editImg && (
              <Button
                variant="contained"
                onClick={() => setEditImg((prev) => !prev)}
              >
                {"Edit Img"}
              </Button>
            )}
            {editImg && (
              <Button variant="contained" onClick={uploadImage}>
                upload
              </Button>
            )}

            {editImg && <Input type="file" onChange={convertBase64}></Input>}
          </Grid>
          {/* <Grid item xs={4}>
            <Typography fontSize={30}>{"Name :"}</Typography>
          </Grid> */}
          <Grid item xs={12}>
            <Typography variant="caption">Name</Typography>
            <Typography fontSize={25}>{user.name}</Typography>
          </Grid>
          {/* <Grid item xs={4}>
            <Typography fontSize={30}>{"Email :"}</Typography>
          </Grid> */}
          <Grid item xs={12}>
            <Typography fontSize={25}>{user.email}</Typography>
          </Grid>
          {/* <Grid item xs={4}>
            <Typography fontSize={30}>{"Phone :"}</Typography>
          </Grid> */}
          <Grid item xs={12}>
            <Typography fontSize={25}>{user.phone}</Typography>
          </Grid>
          {/* <Grid item xs={4}>
            <Typography fontSize={30}>{"Address :"}</Typography>
          </Grid> */}
          <Grid item xs={12}>
            <Typography fontSize={25}>{user.address}</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Profile;
