import React, { useContext, useEffect, useState } from "react";
import ProductGrid from "../productGrid";
import { useNavigate } from "react-router";
import PositionedSnackbar from "../snackbar";
import { Button, Typography } from "@mui/material";
import { AppContext } from "../../App";
import { getMyCartItems, placeMyOrder } from "../../services/buyer";

export const cartContext = React.createContext();

function Cart() {
  const { login_role, setCurrentPage, setProgressBar } = useContext(AppContext);
  const isCart = true;

  const [cartItems, setCartItems] = useState([]);
  const [cartValue, setCartValue] = useState(0);

  const navigate = useNavigate();

  const initialSnackState = {
    open: false,
    msg: "default",
    severity: "error",
    vertical: "top",
    horizontal: "center",
    withCircularProgress: false,
  };
  const [snackState, setSnackState] = React.useState(initialSnackState);

  const fetchCartItems = async () => {
    setProgressBar(true);
    try{
      const resp_data = await getMyCartItems();
      setCartItems(resp_data.cartItems);
      setCartValue(resp_data.cartValue);

    }catch(err){
      setSnackState({
        ...snackState,
        open: true,
        severity: "error",
        msg: err.message,
      });
    }finally{
      setProgressBar(false);
    }
  };

  const placeOrder = async () => {
    if (cartItems.length === 0)
      setSnackState({
        ...snackState,
        open: true,
        msg: "No Item in cart to place order",
        severity: "info",
      });
    else {
      setProgressBar(true);
      try{
        const resp_data = await placeMyOrder();
        setProgressBar(false);
        setSnackState({
          ...snackState,
          open: true,
          msg: resp_data.message,
          severity: "success",
        });
        setCurrentPage("Orders");
        navigate("/orders");
      } catch(err) {
        setSnackState({ ...snackState, open: true, msg: err.message });
      }
    }
  };

  useEffect(() => {
    if (login_role.isLoggedIn && login_role.role === "Customer") {
      fetchCartItems();
    }
  }, []);

  return (
    <div style={{ marginTop: "12vh" }}>
      <PositionedSnackbar
        snackState={snackState}
        setSnackState={setSnackState}
      />
      {login_role.isLoggedIn && (
        <cartContext.Provider value={fetchCartItems}>
          <ProductGrid cart={isCart} products={cartItems} />
        </cartContext.Provider>
      )}
      {login_role.isLoggedIn && (
        <div>
          <Typography>{`Cart Value : ${cartValue}`}</Typography>
          <Button variant="contained" onClick={placeOrder}>
            Place Order
          </Button>
        </div>
      )}
      {!login_role.isLoggedIn && <>Please Login to see your cart</>}
    </div>
  );
}

export default Cart;
