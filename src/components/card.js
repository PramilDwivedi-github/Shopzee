import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router";

import PositionedSnackbar from "./snackbar";
import { productContext } from "./dashboard/products";
import { addCartItem } from "../services/buyer";
import { removeProduct } from "../services/seller";

export default function ImgMediaCard({ product, cart }) {
  const navigate = useNavigate();

  const {
    setCurrentPage,
    login_role,
    fetchProducts,
    setProgressBar,
  } = React.useContext(productContext);

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

  const removeItem = async () => {
    setProgressBar(true);
    const resp_data = await removeProduct(product.product_id);
    setProgressBar(false);
    if (resp_data.message === "Removed SuccessFuly") {
      fetchProducts();
    } else {
      setSnackState({ ...snackState, open: true, msg: resp_data.message });
    }
  };

  return (
    <Card sx={{ maxWidth: 300, maxHeight: 400 }}>
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
          image={product &&product.productImages&& product.productImages.length && product.productImages[0].img_url}
          onClick={() => {
            navigate(`/productDetail/${product&& product.product_id}`);
          }}
        />
        <CardContent
          onClick={() => navigate(`/productDetail/${product&& product.product_id}`)}
        >
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography
            sx={{ color: "blue" }}
          >{`${product.price} Rs`}</Typography>
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
