import { Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router";
import { backend_url } from "../../backendUrl";
import OrderCard from "../ordercard";
import PositionedSnackbar from "../snackbar";
import { AppContext } from "../../App";

function Orders() {
  const { login_role, setCurrentPage, setProgressBar } = useContext(AppContext);

  const [orders, setOrders] = useState([]);
  const initialSnackState = {
    open: false,
    msg: "default",
    severity: "error",
    vertical: "top",
    horizontal: "center",
    withCircularProgress: false,
  };
  const [snackState, setSnackState] = useState(initialSnackState);
  const fetchOrder = async () => {
    if (!login_role.isLoggedIn) return;
    setProgressBar(true);
    let order_url = backend_url;
    if (login_role.role === "Customer") order_url += "buyer/api/myorders";
    else order_url += "seller/api/mysales";

    const response = await fetch(order_url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const resp_data = await response.json();
    setProgressBar(false);
    if (resp_data.message === "success") {
      setOrders(resp_data.orders);
      setSnackState({
        ...snackState,
        open: true,
        msg: "view your orders",
        severity: "success",
      });
    } else {
      setSnackState({ ...snackState, open: true, msg: resp_data.message });
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div
      className="Order-Returning-div"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: "5vh",
      }}
    >
      <PositionedSnackbar
        snackState={snackState}
        setSnackState={setSnackState}
      />
      <div>
        <Grid container sx={{ width: "100%", alignSelf: "baseline" }}>
          <Grid item xs={12}>
            {login_role.isLoggedIn &&
              orders.map((order, index) => (
                <OrderCard key={`order${index}`} order={order} />
              ))}
            {!login_role.isLoggedIn && <>Login to view orders</>}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Orders;
