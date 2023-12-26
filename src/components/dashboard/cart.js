import React, { useContext, useEffect, useState } from "react";
import ProductGrid from "../productGrid";
import { useNavigate } from "react-router";
import PositionedSnackbar from "../snackbar";
import { backend_url } from "../../backendUrl";
import { Button, Typography } from "@mui/material";
import { AppContext } from "../../App";

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
    let cartUrl = backend_url + "buyer/api/mycart";
    const response = await fetch(cartUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const resp_data = await response.json();
    setProgressBar(false);
    if (resp_data.message != "success") {
      setSnackState({
        ...snackState,
        open: true,
        severity: "error",
        msg: resp_data.message,
      });
    } else {
      setCartItems(resp_data.cartItems);
      setCartValue(resp_data.cartValue);
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
      let orderUrl = backend_url + "buyer/api/placeOrder";
      const response = await fetch(orderUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const resp_data = await response.json();
      setProgressBar(false);
      if (resp_data.message === "order placed") {
        setSnackState({
          ...snackState,
          open: true,
          msg: resp_data.message,
          severity: "success",
        });
        setCurrentPage("Orders");
        navigate("/orders");
      } else {
        setSnackState({ ...snackState, open: true, msg: resp_data.message });
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
