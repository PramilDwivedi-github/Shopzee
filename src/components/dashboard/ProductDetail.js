import { Grid, Card, Typography, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AppContext } from "../../App";
import ImageCrousal from "../ImageCrousel";
import { addCartItem } from "../../services/buyer";

const ProductDetail = () => {
  const { setProgressBar, setCurrentPage, login_role } = useContext(AppContext);
  const { state } = useLocation();
  const { product } = state;
  const navigate = useNavigate();

  const [copies, setCopies] = useState(1);
  const initialSnackState = {
    open: false,
    msg: "default",
    severity: "error",
    vertical: "top",
    horizontal: "center",
    withCircularProgress: false,
  };
  const [snackState, setSnackState] = useState(initialSnackState);

  const addToCart = async () => {
    if (!login_role.isLoggedIn) navigate("/login");
    else {
      setProgressBar(true);
      const resp_data = await addCartItem(product);
      setProgressBar(false);
      if (
        resp_data.message === "added successfuly" ||
        resp_data.message === "success"
      ) {
        setCurrentPage("Cart");
        navigate("/cart");
      } else {
        setSnackState({
          ...snackState,
          open: true,
          severity: "error",
          msg: resp_data.message,
        });
      }
    }
  };

  return (
    <div style={{ marginTop: "5vh" }}>
      <Grid container>
        <Grid item md={6} xs={12}>
          <Card sx={{ maxWidth: 600, maxHeight: 600, height: 250 }}>
            <ImageCrousal images={product && product.productImages} dynamicUrlKey={"img_url"}/>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <div>
            <div>
              <Typography sx={{ fontSize: "2rem" }}>{product.name}</Typography>
              <Typography sx={{ fontSize: "1.5rem" }}>
                {`${product.price} $`}
              </Typography>
              <Typography sx={{ fontSize: "0.8rem", color: "green" }}>
                available
              </Typography>
              <Typography>{`Picked ${copies}`}</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button
                variant="contained"
                sx={{ background: "green" }}
                onClick={addToCart}
              >
                cart
              </Button>
              <button
                onClick={() => {
                  setCopies((prev) => prev + 1);
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  setCopies((prev) => prev - 1);
                }}
              >
                -
              </button>
            </div>
          </div>
        </Grid>
        <Grid item md={12} xs={12}>
          <Typography sx={{ fontSize: "1.6rem" }}>Description</Typography>
          <Typography>{product.description}</Typography>
          <Typography sx={{ fontSize: "1.6rem" }}>Sller Info</Typography>
          <Typography>This is seller information</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
