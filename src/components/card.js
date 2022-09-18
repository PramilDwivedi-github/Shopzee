import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router";
import { backend_url } from "../backendUrl";
import LinearDeterminate from "./progressbar";
import PositionedSnackbar from "./snackbar";
import { productContext } from "./dashboard/products";

export default function ImgMediaCard({ product, cart }) {
  const navigate = useNavigate();

  const { setCurrentPage, login_role, fetchProducts } = React.useContext(
    productContext
  );

  const [progressBar, setProgressBar] = React.useState(false);
  const initialSnackState = {
    open: false,
    msg: "default",
    severity: "error",
    vertical: "top",
    horizontal: "center",
    withCircularProgress: false,
  };
  const [snackState, setSnackState] = React.useState(initialSnackState);

  const addToCart = async () => {
    // console.log(product);
    if (!login_role.isLoggedIn) navigate("/login");
    else {
      setProgressBar(true);
      let cartUrl = backend_url + "buyer/api/addCartItem";
      const response = await fetch(cartUrl, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const resp_data = await response.json();
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

  const removeItem = async () => {
    setProgressBar(true);
    let cartUrl = backend_url + "seller/api/removeProducts";
    const response = await fetch(cartUrl, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ product_id: product.product_id }),
    });
    const resp_data = await response.json();
    setProgressBar(false);
    if (resp_data.message === "Removed SuccessFuly") {
      fetchProducts();
    } else {
      setSnackState({ ...snackState, open: true, msg: resp_data.message });
    }
  };

  return (
    <Card sx={{ maxWidth: 300, maxHeight: 400 }}>
      {progressBar && <LinearDeterminate sx={{ height: "5%" }} />}
      <PositionedSnackbar
        snackState={snackState}
        setSnackState={setSnackState}
      />
      <CardActionArea>
        <CardMedia
          sx={{ objectFit: "contain" }}
          component="img"
          alt="green iguana"
          height="180"
          image={product.img}
          onClick={() => navigate("/productDetail", { state: { product } })}
        />
        <CardContent
          onClick={() => navigate("/productDetail", { state: { product } })}
        >
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography sx={{ color: "blue" }}>{`${
            cart ? product.detail.price : product.price
          }$`}</Typography>
        </CardContent>
        <CardActions>
          {login_role.role === "Customer" && (
            <Button
              variant="contained"
              onClick={() => {
                if (!login_role.isLoggedIn) navigate("/login");
                else {
                  setCurrentPage("Cart");
                  navigate("/cart");
                }
              }}
              sx={{ background: "green" }}
            >
              Buy
            </Button>
          )}

          {login_role.role === "Customer" && (
            <Button
              variant="contained"
              onClick={addToCart}
              sx={{ background: "green" }}
            >
              Cart
            </Button>
          )}
          {login_role.role === "Admin" && (
            <Button
              variant="contained"
              onClick={removeItem}
              sx={{ background: "red" }}
            >
              Remove Item
            </Button>
          )}
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
