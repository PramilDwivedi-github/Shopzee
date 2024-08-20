import { Grid, Card, Typography, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { AppContext } from "../../App";
import ImageCrousal from "../ImageCrousel";
import { addCartItem } from "../../services/buyer";
import { getProductById } from "../../services/products";

const ProductDetail = () => {
  const { setProgressBar, setCurrentPage, login_role } = useContext(AppContext);
  const { state } = useLocation();
  const [product,setProduct] = useState({name:null,price:null,description:null,productImages:[]});
  const navigate = useNavigate();
  const params = useParams();
  const {productId} = params;

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

  useEffect(()=>{
    fetchProductDetails()
  },[productId])

  const fetchProductDetails = async () =>{

    try{
      setProgressBar(true);

      const resp_data = await getProductById(productId);;
      setProgressBar(false);
      if (resp_data.message === "success") {
        setProduct(resp_data.product);
      } else {
        setSnackState({ ...snackState, open: true, msg: resp_data.message });
        
      }
    }catch(err){
      setSnackState({
        ...snackState,
        open: true,
        msg: err.message,
        severity: "error",
      });
      setProgressBar(false);
    }
  
  }


  const addToCart = async () => {
    if (!login_role.isLoggedIn) navigate("/login");
    else {
      setProgressBar(true);
      try {
        const resp_data = await addCartItem(product);
        setCurrentPage("Cart");
        navigate("/cart");
      } catch(err) {
        setSnackState({
          ...snackState,
          open: true,
          severity: "error",
          msg: err.message,
        });
      }
      finally{
        setProgressBar(false);
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
              <Typography sx={{ fontSize: "2rem" }}>{product && product.name}</Typography>
              <Typography sx={{ fontSize: "1.5rem" }}>
                {`${product && product.price} $`}
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
          <Typography>{product && product.description}</Typography>
          <Typography sx={{ fontSize: "1.6rem" }}>Sller Info</Typography>
          <Typography>This is seller information</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
